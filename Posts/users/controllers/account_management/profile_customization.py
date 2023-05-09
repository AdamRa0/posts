import os

from Posts.users.models.user_model import UserModel
from ....database.db import get_db

from flask import current_app


db = get_db()

UPLOAD_FOLDER_PATH = current_app.config['UPLOAD_FOLDER']


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
    Changes a user's profile image and removes previously stored profile image.

    Arguments
    ---------
    user: user database object
    filename: file that serves new profile image
    """
    os.remove(os.path.join(UPLOAD_FOLDER_PATH, user.profile_image))
    
    user.profile_image = filename
    db.session.commit()


def change_banner_image(user: UserModel, filename: str):
    """
    Changes a user's banner image and removes previously stored banner image.

    Arguments 
    ----------
    user: user database object
    filename: file that serves as new banner image
    """
    os.remove(os.path.join(UPLOAD_FOLDER_PATH, user.banner_image))

    user.banner_image = filename
    db.session.commit()