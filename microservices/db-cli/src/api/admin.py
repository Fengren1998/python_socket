from flask import jsonify
from flask_restful import Resource

from webargs import fields
from webargs.flaskparser import use_args

from src.handlers.admin import AdminHandler
from src.schemas.admin import AdminSchema


class Admins(Resource):
    def get(self):
        admins = AdminHandler().get_all_admins()

        result = AdminSchema().dump(admins, many=True).data
        return jsonify(result)

    post_args = {
        'first_name': fields.Str(required=True),
        'last_name': fields.Str(required=True),
        'email': fields.Str(required=True),
        'password': fields.Str(required=True),
        'is_receptionist': fields.Boolean(required=True)
    }

    @use_args(post_args)
    def post(self, args):
        first_name = args['first_name']
        last_name = args['last_name']
        email = args['email']
        password = args['password']
        is_receptionist = args['is_receptionist']

        new_admin = AdminHandler().create_admin(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            is_receptionist=is_receptionist,
        )

        result = AdminSchema().dump(new_admin).data
        return jsonify(result)


class Admin(Resource):
    def get(self, id):
        admin = AdminHandler().get_admin_by_id(id=id)

        result = AdminSchema().dump(admin).data
        return jsonify(result)


class AdminByEmail(Resource):
    get_args = {
        'email': fields.Str(required=True),
    }

    @use_args(get_args)
    def get(self, args):
        email = args['email']

        admin = AdminHandler().get_admin_by_email(email=email)

        result = AdminSchema().dump(admin).data
        return jsonify(result)

    patch_args = {
        'email': fields.Str(required=True),
        'new_email': fields.Str(),
        'first_name': fields.Str(),
        'last_name': fields.Str(),
        'password': fields.Str(),
        'is_receptionist': fields.Boolean()
    }

    @use_args(patch_args)
    def patch(self, args):
        email = args.get('email')
        new_email = args.get('new_email')
        first_name = args.get('first_name')
        last_name = args.get('last_name')
        password = args.get('password')
        is_receptionist = args.get('is_receptionist')

        admin = AdminHandler().update_admin_by_email(
            email=email,
            new_email=new_email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            is_receptionist=is_receptionist
        )

        result = AdminSchema().dump(admin).data
        return result
