from sqlalchemy import desc
from ...database.db import get_db
from ..models.post_model import PostModel
from ...users.controllers.account_creation_and_use.get_user import get_user_by_id

db = get_db()


def get_posts(page: int):
    """
    Returns all posts created by registered users
    """
    # return db.session.execute(db.select(PostModel)).scalars()
    return db.paginate(db.select(PostModel).order_by(desc(PostModel.time_created)), page=page)
    # return db.paginate(db.select(PostModel), page=page)



def get_posts_by_user(author_id: str, page: int):
    """
    Returns all posts created by specific user

    Arguments
    ---------
    user_id: User who's post you wish to get
    """
    posts = db.paginate(db.select(PostModel).filter_by(author_id=author_id), page=page)
    return posts
    # return user.posts


def get_reposts_by_user(user_id: str):
    """
    Returns all posts reposted by user

    Arguments
    ---------
    user_id: User who's reposts you wish to get
    """
    user = get_user_by_id(user_id)
    return user.reposts
