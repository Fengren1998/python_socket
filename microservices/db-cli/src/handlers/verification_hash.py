import uuid
from src.db import db
from src.handlers.user import UserHandler
from src.models.verification_hash import VerificationHash
from src.exceptions.user import (
    UserAlreadyVerifiedException,
    UserDoesNotExistException
)


class VerificationHashHandler:
    def get_user_hash(self, email: str) -> VerificationHash:
        user = UserHandler().get_user_by_email(email)

        if not user:
            raise UserDoesNotExistException()

        hash = VerificationHash.query.filter_by(
            user_id=user.id
        ).order_by(
            'date_created desc'
        ).first()

        return hash

    def create_hash(self, email: str) -> VerificationHash:
        user = UserHandler().get_user_by_email(email)
        if not user:
            raise UserDoesNotExistException()

        if user.is_verified:
            raise UserAlreadyVerifiedException('User already verified')

        hash_value = uuid.uuid4().hex
        hash = VerificationHash(
            user_id=user.id,
            hash=hash_value
        )
        db.session.add(hash)
        db.session.commit()

        return hash
