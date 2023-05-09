import os

from ...database.db import get_db
from ..controllers.get_post import get_post
from ..models.post_model import PostModel

from flask import current_app


UPLOAD_FOLDER_PATH = current_app.config['UPLOAD_FOLDER']


def delete_post(post_id: str):
    db = get_db()

    post_to_delete: PostModel = get_post(post_id)

    if post_to_delete.post_file is not None:
        os.remove(UPLOAD_FOLDER_PATH, post_to_delete.post_file)

    if post_to_delete.parent is not None:
        post_to_delete.parent.comments -= 1
        post_to_delete.parent.children.remove(post_to_delete)

    db.session.delete(post_to_delete)
    db.session.commit()
