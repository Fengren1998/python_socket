from flask import Flask
from webargs.flaskparser import parser, abort

from src.db import db
from src.api import api

from src.barcode.receiver import server_init

# APP Configuration
app = Flask(__name__)

debug = True
if app.config['ENV'] == 'development':
    app.config['SQLALCHEMY_DATABASE_URI'] = (
        'postgresql://paperworkph-db-user:password@db:5432/paperworkph-db'
    )
else:
    debug = False

    db_type = 'postgresql'
    db_user = 'paperworkphmaster'
    db_pass = 'PaperWorkPHm4st3r'
    db_host = 'paperworkph-db.c6vd2hdjpyle.ap-southeast-1.rds.amazonaws.com'
    db_port = '5432'
    db_name = 'paperworkphmaster'


    app.config['SQLALCHEMY_DATABASE_URI'] = (
        '{0}://{1}:{2}@{3}:{4}/{5}'.format(
            db_type,
            db_user,
            db_pass,
            db_host,
            db_port,
            db_name
        )
    )

# DB Configuration
db.init_app(app)

with app.app_context():
    db.create_all()

# API Configuration
api.init_app(app)

@parser.error_handler
def handle_request_parsing_error(err, req, schema):
    """
    webargs error handler that uses Flask-RESTful's abort function to return
    a JSON error response to the client.
    """
    abort(422, errors=err.messages)

if __name__ == '__main__':
    print('test db-cli app run')
    app.run(host='0.0.0.0', port='5001', debug=debug)
    server_init()
