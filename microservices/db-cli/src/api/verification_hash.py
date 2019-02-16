from flask import jsonify
from flask_restful import Resource

from webargs import fields
from webargs.flaskparser import use_args

from src.handlers.verification_hash import VerificationHashHandler
from src.schemas.verification_hash import VerificationHashSchema


class VerificationHash(Resource):
    args = {
        'email': fields.Str(required=True),
    }

    @use_args(args)
    def get(self, args):
        email = args['email']
        hash = VerificationHashHandler().get_user_hash(email=email)

        result = VerificationHashSchema().dump(hash).data
        return jsonify(result)

    @use_args(args)
    def post(self, args):
        email = args['email']

        new_hash = VerificationHashHandler().create_hash(email=email)

        result = VerificationHashSchema().dump(new_hash).data
        return jsonify(result)
