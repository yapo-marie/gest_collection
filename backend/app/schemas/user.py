from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, constr


class UserCreate(BaseModel):
    email: EmailStr
    password: constr(min_length=6, max_length=128) = Field(..., description="Mot de passe utilisateur")


class UserRead(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
