import uuid
from src.db import db
from src.handlers.user import UserHandler
from src.models.forgot_password_hash import ForgotPasswordHash
from src.exceptions.user import UserDoesNotExistException


class ForgotPasswordHashHandler:
    def get_user_hash(self, email: str) -> ForgotPasswordHash:
        user = UserHandler().get_user_by_email(email)

        if not user:
            raise UserDoesNotExistException()

        hash = ForgotPasswordHash.query.filter_by(
            user_id=user.id,
        ).order_by(
            'date_created desc'
        ).first()

        return hash

    def create_hash(self, email: str) -> ForgotPasswordHash:
        user = UserHandler().get_user_by_email(email)
        if not user:
            raise UserDoesNotExistException()

        hash_value = uuid.uuid4().hex
        hash = ForgotPasswordHash(
            user_id=user.id,
            hash=hash_value
        )
        db.session.add(hash)
        db.session.commit()

        return hash
