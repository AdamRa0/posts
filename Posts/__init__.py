import os
from .users.routes.user_routes import user_routes
from .posts_.routes.post_routes import post_routes
from .database.db import create_tables, init_app

from flask import Flask


def create_app():
    """
    Creates and returns an instance of our application
    """

    app: Flask = Flask(__name__, instance_relative_config=True)
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.config.from_pyfile('config.py', silent=True)

    init_app(app)

    # Create table if not exists before first request to app
    app.before_first_request(create_tables)

    app.register_blueprint(user_routes)
    app.register_blueprint(post_routes)

    return app