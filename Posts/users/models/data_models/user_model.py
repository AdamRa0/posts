from uuid import uuid4

from sqlalchemy import Column, UUID, String, Integer, Boolean, DateTime
from .. ..database.db import Base

class UserModel(Base):
    __tablename__ = 'users'
    id = Column(UUID, primary_key=True, default=uuid4())
    username = Column(String, nullable=False)
    email_address = Column(String, unique=True, nullable=False)
    handle = Column(String, unique=True, nullable=False)
    password = Column(String)
    bio = Column(String, default='')
    followers = Column(Integer, default=0)
    following = Column(Integer, default=0)

    def __init__(self, username=None, email=None, handle=None, password=None):
        self.username = username
        self.email_address = email
        self.handle = handle
        self.password = password
