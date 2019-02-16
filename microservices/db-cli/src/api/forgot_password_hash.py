from flask import jsonify
from flask_restful import Resource

from webargs import fields
from webargs.flaskparser import use_args

from src.handlers.forgot_password_hash import ForgotPasswordHashHandler
from src.schemas.forgot_password_hash import ForgotPasswordHashSchema


class ForgotPasswordHash(Resource):
    args = {
        'email': fields.Str(required=True),
    }

    @use_args(args)
    def get(self, args):
        email = args['email']
        hash = ForgotPasswordHashHandler().get_user_hash(email=email)

        result = ForgotPasswordHashSchema().dump(hash).data
        return jsonify(result)

    @use_args(args)
    def post(self, args):
        email = args['email']

        new_hash = ForgotPasswordHashHandler().create_hash(email=email)

        result = ForgotPasswordHashSchema().dump(new_hash).data
        return jsonify(result)
