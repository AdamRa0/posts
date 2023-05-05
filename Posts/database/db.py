from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()


def init_app(app: Flask):
    """
    Initalize all app dependecies
    """
    db.init_app(app)
    Migrate(app, db)
    ma.init_app(app)
    jwt.init_app(app)

def create_tables():
    """
    Create database tables
    """
    from ..users.models.user_model import UserModel
    from ..posts_.models.post_model import PostModel
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