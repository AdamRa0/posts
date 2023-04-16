import os
from .users import user_routes
from .database import db

from flask import Flask

def create_app():
    app: Flask = Flask(__name__, instance_relative_config=True)
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.config.from_pyfile('config.py', silent=True)

    db.init_db_tables(app)

    app.register_blueprint(user_routes)

    return app