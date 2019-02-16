from marshmallow import Schema, fields
from src.schemas.user import UserSchema


class ForgotPasswordHashSchema(Schema):
    id = fields.Integer(required=True)
    hash = fields.String(required=True)
    user_id = fields.String(required=True)
    date_created = fields.DateTime(required=True)
    user = fields.Nested(UserSchema)
