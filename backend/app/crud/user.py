from __future__ import annotations

from typing import Optional

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..models import User
from ..schemas import UserCreate
from ..security import get_password_hash


class UserCRUD:
    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email)
        return db.execute(stmt).scalars().first()

    @staticmethod
    def create(db: Session, data: UserCreate) -> User:
        user = User(email=data.email, hashed_password=get_password_hash(data.password))
        db.add(user)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            raise
        db.refresh(user)
        return user
