from ...database.db import get_db
from ...follow.models.follow_model import subscribers
from ...posts_.models.repost_junction_table import posts_reposts

from uuid import uuid4

from sqlalchemy.sql import func
from sqlalchemy import Column, UUID, String, Boolean, DateTime, ForeignKey

db = get_db()


# Junction table for users waiting to be approved as subcribers by a private user
users_subscribers_waitlist = db.Table(
    "users_subscribers_waitlist",
    Column("judge", UUID, ForeignKey("users.id"), primary_key=True),
    Column("judged", UUID, ForeignKey("users.id"), primary_key=True),
)


class UserModel(db.Model):
    __tablename__ = "users"
    id = Column(UUID, primary_key=True, default=uuid4())
    posts = db.relationship("PostModel", backref="author", cascade="delete")
    username = Column(String, nullable=False)
    email_address = Column(String, unique=True, nullable=False)
    network = db.relationship(
        "UserModel",
        secondary=subscribers,
        primaryjoin=(subscribers.c.subscribee_id == id),
        secondaryjoin=(subscribers.c.subscriber_id == id),
        backref=db.backref("subscribers", lazy="dynamic"),
        lazy="dynamic",
        cascade="all, delete",
    )
    reposts = db.relationship(
        "PostModel",
        secondary=posts_reposts,
        backref="reposted_by",
        cascade="all, delete",
    )
    waitlist = db.relationship(
        "UserModel",
        secondary=users_subscribers_waitlist,
        primaryjoin=(users_subscribers_waitlist.c.judge == id),
        secondaryjoin=(users_subscribers_waitlist.c.judged == id),
        backref="waiting_user",
        cascade="all, delete",
    )
    handle = Column(String, unique=True, nullable=False)
    password = Column(String)
    bio = Column(String, default="New to posts")
    is_active = Column(Boolean, default=True)
    is_private = Column(Boolean, default=False)
    date_created = Column(DateTime(timezone=True), default=func.now())
    profile_image = Column(String, default="default_profile_image.jpg")
    banner_image = Column(String, default="default_banner_image.jpg")

    def __init__(self, username=None, email_address=None, handle=None, password=None):
        self.username = username
        self.email_address = email_address
        self.handle = handle
        self.password = password
