from ...database.db import get_db

from uuid import uuid4

from sqlalchemy.sql import func
from sqlalchemy import Column, UUID, String, Integer, Boolean, DateTime

db = get_db()

class UserModel(db.Model):
    __tablename__ = 'users'
    id = Column(UUID, primary_key=True, default=uuid4())
    author = db.relationship('PostModel', backref='author')
    username = Column(String, nullable=False)
    email_address = Column(String, unique=True, nullable=False)
    handle = Column(String, unique=True, nullable=False)
    password = Column(String)
    bio = Column(String, default='New to posts')
    is_active = Column(Boolean, default=False)
    is_private = Column(Boolean, default=False)
    date_created = Column(DateTime(timezone=True), default=func.now())

    def __init__(
        self, 
        username=None, 
        email_address=None, 
        handle=None, 
        password=None
    ):
        self.username = username
        self.email_address = email_address
        self.handle = handle
        self.password = password
