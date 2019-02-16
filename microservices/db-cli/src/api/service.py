from flask import jsonify
from flask_restful import Resource

from webargs import fields
from webargs.flaskparser import use_args

from src.handlers.service import ServiceHandler
from src.schemas.service import ServiceSchema


class Services(Resource):
    get_args = {
        'include_deleted': fields.Boolean(missing=False)
    }
    @use_args(get_args)
    def get(self, args):
        include_deleted = args['include_deleted']
        services = ServiceHandler().get_all_services(
            include_deleted
        )

        result = ServiceSchema().dump(services, many=True).data
        return jsonify(result)

    post_args = {
        'name': fields.Str(required=True),
        'description': fields.Str(required=True),
        'cost': fields.Decimal(required=True),
        'duration': fields.Integer(required=True),
    }

    @use_args(post_args)
    def post(self, args):
        name = args['name']
        description = args['description']
        cost = args['cost']
        duration = args['duration']

        new_service = ServiceHandler().create_service(
            name=name,
            description=description,
            cost=cost,
            duration=duration
        )

        result = ServiceSchema().dump(new_service).data
        return jsonify(result)

    delete_args = {
        'ids': fields.List(fields.Integer(), required=True),
    }

    @use_args(delete_args)
    def delete(self, args):
        ids = args['ids']

        services = ServiceHandler().delete_services(ids)
        result = ServiceSchema(many=True).dump(services).data
        return result


class Service(Resource):
    def get(self, id: int):
        service = ServiceHandler().get_service_by_id(id=id)

        result = ServiceSchema().dump(service).data
        return jsonify(result)

    patch_args = {
        'name': fields.Str(),
        'description': fields.Str(),
        'cost': fields.Decimal(),
        'duration': fields.Integer()
    }

    @use_args(patch_args)
    def patch(self, args, id: int):
        name = args.get('name')
        description = args.get('description')
        cost = args.get('cost')
        duration = args.get('duration')

        service = ServiceHandler().update_service_by_id(
            id=id,
            name=name,
            description=description,
            cost=cost,
            duration=duration
        )

        result = ServiceSchema().dump(service).data
        return result
