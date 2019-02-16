from datetime import datetime
from typing import List
from src.models.user import User
from src.db import db
from src.exceptions.user import UserDoesNotExistException


class UserHandler:
    def get_user_by_id(self, id: int) -> User:
        user = User.query.filter_by(id=id).first()
        return user

    def get_all_users(
            self,
            include_deleted: bool = False
    ) -> List[User]:
        users = User.query
        if not include_deleted:
            users = users.filter_by(
                date_removed=None
            )
        return users.all()

    def get_user_by_email(self, email: str) -> User:
        user = User.query.filter_by(email=email).first()
        return user

    def get_user_is_verified(self, email) -> bool:
        user = User.query.filter_by(email=email).first()
        return user.is_verified

    def create_user(
            self,
            first_name: str,
            last_name: str,
            email: str,
            password: str
    ) -> User:
        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        db.session.add(user)
        db.session.commit()
        return user

    def update_user_by_email(
        self,
        email: str,
        new_email: str,
        first_name: str,
        last_name: str,
        password: str,
        is_verified: bool,
    ) -> User:
        user = User.query.filter_by(email=email).first()

        if not user:
            raise UserDoesNotExistException()

        user.email = new_email if new_email else user.email
        user.first_name = first_name if first_name else user.first_name
        user.last_name = last_name if last_name else user.last_name
        user.password = password if password else user.password
        user.is_verified = is_verified if is_verified else user.is_verified

        db.session.commit()

        return user

    def delete_users(self, ids: List[int]) -> List[User]:
        users = User.query.filter(
            User.id.in_(ids)
        ).all()

        for user in users:
            user.date_removed = datetime.utcnow()

        db.session.commit()

        return users
