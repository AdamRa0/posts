import os

from ....database.db import get_db

from flask import current_app


UPLOAD_FOLDER_PATH = current_app.config['UPLOAD_FOLDER']

def del_user(user):
    """
    Deletes user from database.
    Deletes user's uploaded content from server.

    Arguments
    ---------
    user: user to be deleted
    """

    prefix = user.id

    db = get_db()

    for filename in os.listdir(UPLOAD_FOLDER_PATH):
        if filename.startswith(prefix):
            os.remove(filename)

    db.session.delete(user)
    db.session.commit()
