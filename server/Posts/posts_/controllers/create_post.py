from datetime import datetime
import pytz


from ..models.post_model import PostModel
from ..models.post_creation_model import PostCreationModel
from ...database.db import get_db


def create_post(body: PostCreationModel):
    timezone = pytz.timezone("UTC")
    timestamp: datetime = datetime.now(timezone)

    db = get_db()

    new_post = PostModel(
        body=body.body,
        author_id=body.author_id,
        post_file=body.post_file if body.post_file is not None else None,
        time_created=timestamp,
        comments=0,
        approvals=0,
        disapprovals=0
    )

    db.session.add(new_post)
    db.session.commit()
