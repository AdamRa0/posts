from .. ..database.db import get_db
from ...models.user_model import UserModel

db = get_db()


def get_user_by_handle(user_handle: str):
    """
    Get user by handle.

    Arguments
    ---------
    user_handle: user account handle
    """
    user = db.session.execute(db.select(UserModel).filter_by(handle=user_handle)).scalar_one()

    return user


def get_user_by_email(user_email: str):
    """
    Get user by their email.

    Arguments
    ---------
    user_email: Account holder email
    """
    user = db.session.execute(db.select(UserModel).filter_by(email_address=user_email)).scalar_one()

    return user


def get_user_by_id(user_id: str):
    """
    Get user by id

    Arguments
    ---------
    user_id: generated user id
    """

    user = db.session.execute(db.select(UserModel).filter_by(id=user_id)).scalar_one()

    return user

def get_all_registered_users():
    """
    Returns all registered users
    """

    return db.session.execute(db.select(UserModel)).scalars()