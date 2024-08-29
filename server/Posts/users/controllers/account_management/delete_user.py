import os

from ...models.user_model import UserModel
from ....database.db import get_db

from flask import Flask


def del_user(app: Flask, user: UserModel):
    """
    Deletes user from database.
    Deletes user's uploaded content from server.

    Arguments
    ---------
    app: Our application
    user: user to be deleted
    """
    UPLOAD_FOLDER_PATH = app.config["UPLOAD_FOLDER"]

    db = get_db()

    if user.profile_image != "default_profile_image.jpg":
        pfp_filename = os.path.join(UPLOAD_FOLDER_PATH, user.profile_image)
        os.remove(pfp_filename) 

    if user.banner_image != "default_banner_image.jpg":
        banner_filename = os.path.join(UPLOAD_FOLDER_PATH, user.banner_image)
        os.remove(banner_filename) 


    db.session.delete(user)
    db.session.commit()
