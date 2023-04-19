import os
from .users.routes.user_routes import user_routes
from .database.db import init_db ,shutdown_session

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

    # Create table if not exists before first request to app
    app.before_first_request(init_db)

    # Close database session after request or after application shuts down
    app.teardown_appcontext(shutdown_session)

    app.register_blueprint(user_routes)

    return app