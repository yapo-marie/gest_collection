from __future__ import annotations

import os
import pathlib
import shutil
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi import Request
from fastapi.responses import JSONResponse

from ..config import get_settings
from ..security import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])
settings = get_settings()

UPLOAD_DIR = pathlib.Path(settings.upload_dir)


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_file(request: Request, file: UploadFile = File(...)) -> JSONResponse:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    extension = pathlib.Path(file.filename or "").suffix
    safe_name = f"{uuid.uuid4().hex}{extension}"
    destination = UPLOAD_DIR / safe_name

    try:
        with destination.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except OSError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to store uploaded file"
        ) from exc

    url = request.url_for("uploads", path=safe_name)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"url": str(url)})
