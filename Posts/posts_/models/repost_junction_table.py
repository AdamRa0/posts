from ...database.db import get_db
from sqlalchemy import Column, UUID, ForeignKey


db = get_db()


posts_reposts = db.Table(
    "posts_reposts",
    Column("post_id", UUID, ForeignKey("posts.id"), primary_key=True),
    Column("reposter_id", UUID, ForeignKey("users.id"), primary_key=True),
)
