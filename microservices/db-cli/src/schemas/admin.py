from marshmallow import Schema, fields


class AdminSchema(Schema):
    id = fields.Integer(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)
    is_receptionist = fields.Boolean()
