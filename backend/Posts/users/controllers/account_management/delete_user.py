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

    prefix = user.id

    db = get_db()

    for filename in os.listdir(UPLOAD_FOLDER_PATH):
        if filename.startswith(str(prefix)):
            filename = os.path.join(UPLOAD_FOLDER_PATH, filename)

            try:
                os.remove(filename)
            except Exception as e:
                print("Error: %s, %s", e.filename, e.strerror)

    db.session.delete(user)
    db.session.commit()
