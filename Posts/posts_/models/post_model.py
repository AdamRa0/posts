from ...database.db import get_db

from uuid import uuid4

from sqlalchemy import Column, Integer, String, DateTime, UUID, ForeignKey
from sqlalchemy.sql import func


db = get_db()


class PostModel(db.Model):
    __tablename__ = 'posts'
    id = Column(UUID, primary_key=True, default=uuid4)
    body = Column(String, nullable=False)
    author_id = Column(UUID, ForeignKey('users.id'), nullable=False)
    approvals = Column(Integer, default=0)
    disapprovals = Column(Integer, default=0)
    reposts = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    time_created = Column(DateTime(timezone=True), default=func.now())