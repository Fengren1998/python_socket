from typing import List
from src.models.admin import Admin
from src.db import db
from src.exceptions.admin import AdminDoesNotExistException


class AdminHandler:
    def get_admin_by_id(self, id: int) -> Admin:
        admin = Admin.query.filter_by(id=id).first()
        return admin

    def get_all_admins(self) -> List[Admin]:
        admins = Admin.query.all()
        return admins

    def get_admin_by_email(self, email: str) -> Admin:
        admin = Admin.query.filter_by(email=email).first()
        return admin

    def create_admin(
            self,
            first_name: str,
            last_name: str,
            email: str,
            password: str,
            is_receptionist: bool,
    ) -> Admin:
        admin = Admin(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            is_receptionist=is_receptionist,
        )
        db.session.add(admin)
        db.session.commit()
        return admin

    def update_admin_by_email(
        self,
        email: str,
        new_email: str,
        first_name: str,
        last_name: str,
        password: str,
        is_receptionist: bool,
    ) -> Admin:
        admin = Admin.query.filter_by(email=email).first()

        if not admin:
            raise AdminDoesNotExistException()

        admin.email = new_email if new_email else admin.email
        admin.first_name = first_name if first_name else admin.first_name
        admin.last_name = last_name if last_name else admin.last_name
        admin.password = password if password else admin.password
        admin.is_receptionist = (
            is_receptionist
            if is_receptionist
            else admin.is_receptionist
        )

        db.session.commit()

        return admin
