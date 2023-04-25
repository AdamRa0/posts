from .. .database.db import get_db
from ..models.post_model import PostModel


db = get_db()


def get_posts():
    return db.session.execute(db.select(PostModel)).scalars()


def get_posts_by_user(author_id: str):
    return db.session.execute(db.select(PostModel).filter_by(author_id=author_id)).scalars()