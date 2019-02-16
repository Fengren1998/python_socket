from marshmallow import Schema, fields


class ServiceSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)
    cost = fields.Decimal(required=True, as_string=True)
    duration = fields.Integer(required=True)
    date_removed = fields.DateTime()
