from ...database.db import get_db
from .get_post import get_post

    
db = get_db()


def like_post(post_id: str):
    post = get_post(post_id)

    post.approvals += 1

    db.session.commit()


def dislike_post(post_id: str):
    post = get_post(post_id)

    post.disapprovals += 1

    db.session.commit()