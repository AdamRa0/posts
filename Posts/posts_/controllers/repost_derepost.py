from ..controllers.get_post import get_post
from .. .database.db import get_db
from .. .users.controllers.account_creation_and_use.get_user import get_user_by_id


db = get_db()


def repost(post_id: str, user_id: str):
    """
    Add a post reposted by user as a repost.

    Arguments
    ---------
    post_id: Id of post to repost
    user_id: Id of user who reposts a post
    """
    post = get_post(post_id)

    user = get_user_by_id(user_id)

    post.reposts += 1
    user.reposts.append(post)

    db.session.commit()


def del_repost(post_id: str, user_id: str):
    """
    Remove a post reposted by user from their reposts.

    Arguments
    ---------
    post_id: Id of post to repost
    user_id: Id of user who remove a post from their reposts
    """
    post = get_post(post_id)

    user = get_user_by_id(user_id)

    post.reposts -= 1
    user.reposts.remove(post)

    db.session.commit() 