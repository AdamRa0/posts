from .. .database.db import get_db
from ..controllers.get_post import get_post

def delete_post(post_id: str):
    db = get_db()

    post_to_delete = get_post(post_id)

    db.session.delete(post_to_delete)
    db.session.commit()
