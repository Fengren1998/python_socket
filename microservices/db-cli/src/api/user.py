from flask import jsonify
from flask_restful import Resource

from webargs import fields
from webargs.flaskparser import use_args

from src.handlers.user import UserHandler
from src.schemas.user import UserSchema


class Users(Resource):
    get_args = {
        'include_deleted': fields.Boolean(missing=False)
    }
    @use_args(get_args)
    def get(self, args):
        include_deleted = args['include_deleted']
        users = UserHandler().get_all_users(
            include_deleted
        )

        result = UserSchema().dump(users, many=True).data
        return jsonify(result)

    post_args = {
        'first_name': fields.Str(required=True),
        'last_name': fields.Str(required=True),
        'email': fields.Str(required=True),
        'password': fields.Str(required=True),
    }

    @use_args(post_args)
    def post(self, args):
        first_name = args['first_name']
        last_name = args['last_name']
        email = args['email']
        password = args['password']

        new_user = UserHandler().create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )

        result = UserSchema().dump(new_user).data
        return jsonify(result)
    
    delete_args = {
        'ids': fields.List(fields.Integer(), required=True),
    }

    @use_args(delete_args)
    def delete(self, args):
        ids = args['ids']

        users = UserHandler().delete_users(ids)
        result = UserSchema(many=True).dump(users).data
        return result


class User(Resource):
    def get(self, id):
        user = UserHandler().get_user_by_id(id=id)

        result = UserSchema().dump(user).data
        return jsonify(result)


class UserByEmail(Resource):
    get_args = {
        'email': fields.Str(required=True),
    }

    @use_args(get_args)
    def get(self, args):
        email = args['email']

        user = UserHandler().get_user_by_email(email=email)

        result = UserSchema().dump(user).data
        return jsonify(result)

    patch_args = {
        'email': fields.Str(required=True),
        'new_email': fields.Str(),
        'first_name': fields.Str(),
        'last_name': fields.Str(),
        'password': fields.Str(),
        'is_verified': fields.Boolean()
    }

    @use_args(patch_args)
    def patch(self, args):
        email = args.get('email')
        new_email = args.get('new_email')
        first_name = args.get('first_name')
        last_name = args.get('last_name')
        password = args.get('password')
        is_verified = args.get('is_verified')

        user = UserHandler().update_user_by_email(
            email=email,
            new_email=new_email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            is_verified=is_verified
        )

        result = UserSchema().dump(user).data
        return result
