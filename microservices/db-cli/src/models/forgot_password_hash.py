from datetime import datetime
from src.db import db


class ForgotPasswordHash(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hash = db.Column(db.String(), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    date_removed=db.Column(db.DateTime())
