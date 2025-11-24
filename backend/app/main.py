from __future__ import annotations

import logging
import time
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from .api import api_router
from .config import get_settings
from .database import Base, engine

logger = logging.getLogger(__name__)

settings = get_settings()
app = FastAPI(title=settings.app_name)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=settings.upload_dir, check_dir=False), name="uploads")


@app.on_event("startup")
def on_startup() -> None:
    logger.info("Starting up application", extra={"environment": settings.environment})
    wait_for_database()
    Base.metadata.create_all(bind=engine)


@app.get("/health", tags=["health"])
def healthcheck() -> dict[str, Any]:
    return {"status": "ok"}


app.include_router(api_router, prefix="/api")


def wait_for_database(max_attempts: int = 30, delay_seconds: int = 3) -> None:
    """Block application startup until the database is reachable."""
    attempt = 0
    while attempt < max_attempts:
        attempt += 1
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            logger.info("Database connection established")
            return
        except OperationalError as exc:  # pragma: no cover - boot-time loops
            logger.warning(
                "Database connection failed; retrying",
                extra={"attempt": attempt, "max_attempts": max_attempts, "error": str(exc)},
            )
            time.sleep(delay_seconds)

    raise RuntimeError("Database is not available after retries")
