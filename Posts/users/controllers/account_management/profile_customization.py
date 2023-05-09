from Posts.users.models.user_model import UserModel
from ....database.db import get_db

db = get_db()


def change_username(user: UserModel, username: str):
    """
    Changes a user's username

    Arguments
    ---------
    user: user database object
    username: new username
    """
    user.username = username
    db.session.commit()


def change_handle(user: UserModel, handle: str):
    """
    Changes a user's account handle

    Arguments
    ---------
    user: user database object
    handle: new user account handle
    """
    user.handle = handle
    db.session.commit()


def change_email_address(user: UserModel, email_address: str):
    """
    Changes a user's email address

    Arguments
    ---------
    user: user database object
    email_address: new email address
    """
    user.email_address = email_address
    db.session.commit()


def change_profile_image(user: UserModel, filename: str):
    """
    Changes a user's profile image

    Arguments
    ---------
    user: user database object
    filename: file that serves new profile image
    """
    user.profile_image = filename
    db.session.commit()


def change_banner_image(user: UserModel, filename: str):
    """
    Changes a user's banner image

    Arguments 
    ----------
    user: user database object
    filename: file that serves as new banner image
    """
    user.banner_image = filename
    db.session.commit()