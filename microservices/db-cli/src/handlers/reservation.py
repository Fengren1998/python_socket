from datetime import datetime
from decimal import Decimal
from typing import List
from src.models.reservation import Reservation
from src.models.service import Service
from src.models.user import User
from src.db import db
from src.exceptions.reservation import ReservationDoesNotExistException
from src.exceptions.user import UserDoesNotExistException
from src.exceptions.service import ServiceDoesNotExistException


class ReservationHandler:
    def get_reservation_by_id(self, id: int) -> Reservation:
        reservation = Reservation.query.filter_by(
            id=id,
            date_removed=None
        ).first()
        return reservation

    def get_all_reservations(
            self,
            include_deleted: bool = False
    ) -> List[Reservation]:
        reservations = Reservation.query
        if not include_deleted:
            reservations = reservations.filter_by(
                date_removed=None
            )
        return reservations.all()
    def create_reservation(
            self,
            user_id: int,
            service_id: int,
            duration: int,
            date_reserved: datetime,
            is_finished: bool = False,
            is_confirmed: bool = False,
    ) -> Reservation:
        reservation = Reservation(
            user_id=user_id,
            service_id=service_id,
            duration=duration,
            date_reserved=date_reserved,
            is_finished=is_finished,
            is_confirmed=is_confirmed,
        )
        db.session.add(reservation)
        db.session.commit()
        return reservation

    def update_reservation_by_id(
            self,
            id: int,
            user_id: int,
            service_id: int,
            duration: int,
            date_reserved: datetime,
            is_finished: bool = False,
            is_confirmed: bool = False,
    ) -> Reservation:
        reservation = Reservation.query.filter_by(
            id=id,
            date_removed=None
        ).first()

        if not reservation:
            raise ReservationDoesNotExistException()

        if user_id is not None:
            user = User.query.filter_by(
                id=user_id,
                date_removed=None
            ).first()

            if not user:
                raise UserDoesNotExistException()

            reservation.user_id = user_id

        if service_id is not None:
            service = Service.query.filter(
                id=service_id,
                date_removed=None
            ).first()

            if not service:
                raise ServiceDoesNotExistException()

            reservation.service_id = service_id

        reservation.duration = duration if duration else reservation.duration
        reservation.date_reserved = date_reserved if date_reserved else reservation.date_reserved
        reservation.is_finished = is_finished if is_finished else reservation.is_finished
        reservation.is_confirmed = is_confirmed if is_confirmed else reservation.is_confirmed

        db.session.commit()

        return reservation


    def delete_reservations(self, ids: List[int]) -> List[Reservation]:
        reservations = Reservation.query.filter(
            Reservation.id.in_(ids)
        ).all()

        for reservation in reservations:
            reservation.date_removed = datetime.utcnow()

        db.session.commit()

        return reservations
