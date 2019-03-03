from flask_restful import Api
from .ping import Ping
from .admin import Admins, Admin, AdminByEmail
from .user import Users, User, UserByEmail
from .service import Services, Service
from .reservation import Reservations, Reservation
from .verification_hash import VerificationHash
from .forgot_password_hash import ForgotPasswordHash

api = Api()

api.add_resource(Ping, '/ping')

api.add_resource(Admins, '/admins')
api.add_resource(Admin, '/admins/<int:id>')
api.add_resource(AdminByEmail, '/admins/email')

api.add_resource(Users, '/users')
api.add_resource(User, '/users/<int:id>')
api.add_resource(UserByEmail, '/users/email')

api.add_resource(Services, '/services')
api.add_resource(Service, '/services/<int:id>')

api.add_resource(Reservations, '/reservations')
api.add_resource(Reservation, '/reservations/<int:id>')

api.add_resource(ForgotPasswordHash, '/forgot-password-hash')
api.add_resource(VerificationHash, '/verification-hash')
