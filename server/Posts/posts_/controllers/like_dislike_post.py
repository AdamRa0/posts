from ...users.controllers.account_creation_and_use.get_user import get_user_by_id
from ...database.db import get_db
from .get_post import get_post


db = get_db()


def like_post(post_id: str, user_id: str):
    post = get_post(post_id)
    user = get_user_by_id()

    post.approvals += 1
    user.likes.append(post)

    db.session.commit()


def dislike_post(post_id: str, user_id: str):
    post = get_post(post_id)
    user = get_user_by_id(user_id)

    post.disapprovals -= 1
    user.likes.remove(post)

    db.session.commit()
