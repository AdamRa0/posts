from flask import current_app

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DB_NAME: str = current_app.config['DB_NAME']
DB_USER: str = current_app.config['DB_USER']
DB_PASSWORD: str = current_app.config['DB_PASSWORD']

URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@localhost:5432/{DB_NAME}"

engine = create_engine(URL)

db_session = scoped_session(sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    """
    Create and return database connection
    """
    from ..users.models.data_models.user_model import UserModel
    Base.metadata.create_all(bind=engine)

def shutdown_session(exception=None):
    db_session.remove()