from ..controllers.get_post import get_post
from ...database.db import get_db
from ..models.post_update_model import PostUpdateModel


def update_post(body: PostUpdateModel):
    db = get_db()

    post = get_post(body.id)

    post.body = body.body

    db.session.commit()

    updated_post = get_post(body.id)

    return updated_post
