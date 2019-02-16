from datetime import datetime
from decimal import Decimal
from typing import List
from src.models.service import Service
from src.db import db
from src.exceptions.service import ServiceDoesNotExistException


class ServiceHandler:
    def get_service_by_id(self, id: int) -> Service:
        service = Service.query.filter_by(
            id=id,
            date_removed=None
        ).first()
        return service

    def get_all_services(
            self,
            include_deleted: bool = False
    ) -> List[Service]:
        services = Service.query
        if not include_deleted:
            services = services.filter_by(
                date_removed=None
            )
        return services.all()

    def create_service(
            self,
            name: str,
            description: str,
            cost: Decimal,
            duration: int,
    ) -> Service:
        service = Service(
            name=name,
            description=description,
            cost=cost,
            duration=duration,
        )
        db.session.add(service)
        db.session.commit()
        return service

    def update_service_by_id(
        self,
        id: int,
        name: str,
        description: str,
        cost: Decimal,
        duration: int,
    ) -> Service:
        service = Service.query.filter_by(
            id=id,
            date_removed=None
        ).first()

        if not service:
            raise ServiceDoesNotExistException()

        service.name = name if name else service.name
        service.description = (
            description
            if description
            else service.description
        )
        service.cost = cost if cost else service.cost
        service.duration = duration if duration else service.duration

        db.session.commit()

        return service


    def delete_services(self, ids: List[int]) -> List[Service]:
        services = Service.query.filter(
            Service.id.in_(ids)
        ).all()

        for service in services:
            service.date_removed = datetime.utcnow()

        db.session.commit()

        return services
