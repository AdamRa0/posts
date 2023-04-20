from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

URI = f"postgresql://postgres:secret@localhost:5432/posts"


def init_app(app: Flask):
    """
    Initialize Flask-SQLAlchemy for use by application
    """
    app.config['SQLALCHEMY_DATABASE_URI'] = URI
    db.init_app(app)


def create_tables():
    """
    Create database tables
    """
    from ..users.models.data_models.user_model import UserModel
    db.create_all()


def get_db():
    """
    Returns db session for use in inserting to, querying and modifying data in database.
    """
    return db