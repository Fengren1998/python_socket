from marshmallow import Schema, fields


class ReservationSchema(Schema):
    id = fields.Integer(required=True)
    user_id = fields.Integer(required=True)
    service_id = fields.Integer(required=True)
    duration = fields.Integer(required=True)
    is_finished = fields.Boolean()
    is_confirmed = fields.Boolean()
    date_reserved = fields.DateTime(required=True)
    date_created = fields.DateTime()
    date_removed = fields.DateTime()
