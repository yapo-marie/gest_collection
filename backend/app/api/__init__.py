from fastapi import APIRouter

from .collections import router as collections_router
from .items import router as items_router
from .uploads import router as uploads_router
from .auth import router as auth_router

api_router = APIRouter()
api_router.include_router(auth_router, tags=["auth"])
api_router.include_router(collections_router, prefix="/collections", tags=["collections"])
api_router.include_router(items_router, prefix="/items", tags=["items"])
api_router.include_router(uploads_router, tags=["uploads"])

__all__ = ["api_router"]
