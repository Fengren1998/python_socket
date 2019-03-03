from flask import jsonify
from flask_restful import Resource

from webargs import fields
from webargs.flaskparser import use_args

from src.handlers.reservation import ReservationHandler
from src.schemas.reservation import ReservationSchema


class Reservations(Resource):
    get_args = {
        'include_deleted': fields.Boolean(missing=False),
        'is_confirmed': fields.Boolean(required=False),
        'is_finished': fields.Boolean(required=False)
    }
    @use_args(get_args)
    def get(self, args):
        include_deleted = args['include_deleted']
        is_confirmed = args.get('is_confirmed')
        is_finished = args.get('is_finished')
        reservations = ReservationHandler().get_all_reservations(
            include_deleted,
            is_confirmed,
            is_finished,
        )

        result = ReservationSchema().dump(reservations, many=True).data
        return jsonify(result)

    post_args = {
        'user_id': fields.Integer(required=True),
        'service_id': fields.Integer(required=True),
        'duration': fields.Integer(required=True),
        'date_reserved': fields.DateTime(required=True),
        'is_finished': fields.Boolean(missing=None),
        'is_confirmed': fields.Boolean(missing=None)
    }

    @use_args(post_args)
    def post(self, args):
        user_id = args['user_id']
        service_id = args['service_id']
        duration = args['duration']
        date_reserved = args['date_reserved']
        is_finished = args.get('is_finished')
        is_confirmed = args.get('is_confirmed')

        new_reservation = ReservationHandler().create_reservation(
            user_id=user_id,
            service_id=service_id,
            duration=duration,
            date_reserved=date_reserved,
            is_finished=is_finished,
        )

        result = ReservationSchema().dump(new_reservation).data
        return jsonify(result)

    delete_args = {
        'ids': fields.List(fields.Integer(), required=True),
    }

    @use_args(delete_args)
    def delete(self, args):
        ids = args['ids']

        reservations = ReservationHandler().delete_reservations(ids)
        result = ReservationSchema(many=True).dump(reservations).data
        return result


class Reservation(Resource):
    def get(self, id: int):
        reservation = ReservationHandler().get_reservation_by_id(id=id)

        result = ReservationSchema().dump(reservation).data
        return jsonify(result)

    patch_args = {
        'user_id': fields.Integer(),
        'service_id': fields.Integer(),
        'duration': fields.Integer(),
        'date_reserved': fields.DateTime(),
        'is_finished': fields.Boolean(),
        'is_confirmed': fields.Boolean()
    }

    @use_args(patch_args)
    def patch(self, args, id: int):
        user_id = args.get('user_id')
        service_id = args.get('service_id')
        duration = args.get('duration')
        date_reserved = args.get('date_reserved')
        is_finished = args.get('is_finished')
        is_confirmed = args.get('is_confirmed')

        reservation = ReservationHandler().update_reservation_by_id(
            id=id,
            user_id=user_id,
            service_id=service_id,
            duration=duration,
            date_reserved=date_reserved,
            is_finished=is_finished,
            is_confirmed=is_confirmed
        )

        result = ReservationSchema().dump(reservation).data
        return result
