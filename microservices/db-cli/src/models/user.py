from datetime import datetime
from src.db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    is_verified = db.Column(db.Boolean(), default=False, nullable=False)
    date_created=db.Column(db.DateTime(), default=datetime.utcnow)
    date_removed=db.Column(db.DateTime())

    verification_hashes = db.relationship(
        'VerificationHash',
        backref='user',
        lazy=True
    )
