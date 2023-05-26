from uuid import uuid4

from Posts.posts_.models.post_model import PostModel


def test_post_model():
    """
    GIVEN a Post Model
    WHEN creating a new post
    CHECK body and author_id correspond to the given values and post_file = None
    """
    mock_author_id = uuid4()
    new_post = PostModel(
        body="test_body",
        author_id=mock_author_id,
        post_file=None
    )

    assert new_post.body == 'test_body'
    assert new_post.author_id == mock_author_id
    assert new_post.post_file == None
