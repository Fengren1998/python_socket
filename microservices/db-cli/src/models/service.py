from datetime import datetime
from src.db import db


class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(), nullable=False)
    cost = db.Column(db.Integer(), nullable=False)
    duration = db.Column(db.BigInteger(), nullable=False)
    date_created=db.Column(db.DateTime(), default=datetime.utcnow)
    date_removed=db.Column(db.DateTime())
