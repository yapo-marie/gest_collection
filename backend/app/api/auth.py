from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..crud.user import UserCRUD
from ..database import get_db
from ..models import User
from ..schemas import Token, UserCreate, UserRead
from ..security import (
    create_access_token,
    get_current_user,
    verify_firebase_id_token,
    verify_password,
)

router = APIRouter()


@router.post("/auth/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)) -> UserRead:
    try:
        return UserCRUD.create(db, payload)
    except IntegrityError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered") from exc


@router.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Token:
    user = UserCRUD.get_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")

    token = create_access_token(user.email)
    return Token(access_token=token)


@router.get("/auth/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)) -> UserRead:
    return current_user


@router.post("/auth/firebase", response_model=Token)
def firebase_login(payload: dict, db: Session = Depends(get_db)) -> Token:
    firebase_token = payload.get("id_token")
    if not firebase_token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="id_token is required")

    decoded = verify_firebase_id_token(firebase_token)
    email = decoded.get("email")
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email missing from token")

    user = UserCRUD.get_by_email(db, email=email)
    if not user:
        # create a user with a random hashed password (not used for Firebase auth)
        user = UserCRUD.create(db, UserCreate(email=email, password=decoded.get("sub", "firebase-placeholder")))

    token = create_access_token(email)
    return Token(access_token=token)
