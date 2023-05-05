from ....database.db import get_db

db = get_db()


def change_username(user, username: str):
    """
    Changes a user's username

    Arguments
    ---------
    user: user database object
    username: new username
    """
    user.username = username
    db.session.commit()


def change_handle(user, handle: str):
    """
    Changes a user's account handle

    Arguments
    ---------
    user: user database object
    handle: new user account handle
    """
    user.handle = handle
    db.session.commit()


def change_email_address(user, email_address: str):
    """
    Changes a user's email address

    Arguments
    ---------
    user: user database object
    email_address: new email address
    """
    user.email_address = email_address
    db.session.commit()
