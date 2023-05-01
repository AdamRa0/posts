from ...database.db import get_db
from .get_post import get_post
from ..models.post_model import PostModel
from ..models.post_creation_model import PostCreationModel


db = get_db()


def post_comment(post_id: str, comment: PostCreationModel):
    """
    Adds a comment to a post
    Arguments
    ---------
    post_id: Id of post that is commented on
    comment: Comment to parent post.
    """
    parent_post = get_post(post_id)

    new_comment = PostModel(
        body=comment.body,
        author_id=comment.author_id
    )

    parent_post.children.append(new_comment)
    parent_post.comments += 1

    db.session.commit()

