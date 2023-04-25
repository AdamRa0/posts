from .. .database.db import get_db
from ..models.post_model import PostModel

def get_post(post_id: str):
    db = get_db()

    post = db.session.execute(db.select(PostModel).filter_by(id=post_id)).scalar_one()

    return post


def get_post_by_author_id(author_id: str):
    db = get_db()

    post = db.session.execute(db.select(PostModel).filter_by(author_id=author_id).order_by(PostModel.time_created.desc())).scalars()

    return post
