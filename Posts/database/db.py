from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
ma = Marshmallow()

URI = f"postgresql://postgres:secret@localhost:5432/posts"


def init_app(app: Flask):
    """
    Set database URI 
    Initializes Flask-SQLAlchemy for use by application
    Initializes Flask-Marshmallow for use by application
    """
    app.config['SQLALCHEMY_DATABASE_URI'] = URI
    db.init_app(app)
    Migrate(app, db)
    ma.init_app(app)

def create_tables():
    """
    Create database tables
    """
    from ..users.models.data_models.user_model import UserModel
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