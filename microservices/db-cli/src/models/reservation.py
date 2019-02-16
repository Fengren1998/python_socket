from datetime import datetime
from src.db import db


class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    duration = db.Column(db.BigInteger(), nullable=False)
    is_finished = db.Column(db.Boolean, default=False)
    is_confirmed = db.Column(db.Boolean, default=False)
    date_reserved=db.Column(db.DateTime(), nullable=False)
    date_created=db.Column(db.DateTime(), default=datetime.utcnow)
    date_removed=db.Column(db.DateTime())
