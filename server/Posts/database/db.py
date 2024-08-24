from datetime import timedelta
import os

from flask import Flask, jsonify
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS


db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()


@jwt.unauthorized_loader
def custom_missing_cookie_error(err_msg):
    return jsonify({
        "error": "Authorization Required",
        "message": "You must be logged in to access this resource."
    }), 401


def init_app(app: Flask):
    """
    Initalizes all app dependecies and creates tables if not exits.
    Sets all config variables
    """

    app.config['TRAP_HTTP_EXCEPTIONS']=True

    ENVIRONMENT = os.environ.get("ENVIRONMENT")

    if ENVIRONMENT is not None and ENVIRONMENT == "development":
        app.config.from_pyfile("config.py", silent=True)
    elif ENVIRONMENT is not None and ENVIRONMENT == "docker_dev":
        app.config.from_pyfile("config-docker.py", silent=True)
    else:
        app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
        app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
            "SQLALCHEMY_DATABASE_URI"
        )
        app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
        app.config["JWT_COOKIE_SECURE"] = os.environ.get("JWT_COOKIE_SECURE")
        app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=2)
        app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024
        app.config["UPLOAD_FOLDER"] = "uploads"

    CORS(app)
    db.init_app(app)
    Migrate(app, db)
    ma.init_app(app)
    jwt.init_app(app)


def create_tables(app: Flask):
    """
    Create database tables
    """
    from ..users.models.user_model import UserModel
    from ..posts_.models.post_model import PostModel

    with app.app_context():
        db.create_all()


def get_db():
    """
    Returns db session for use in inserting to, querying and modifying data in database.
    """
    return db


def get_marshmallow_obj():
    """
    Returns marshmallow object initialized to application
    """
    return ma
