from ...database.db import get_marshmallow_obj
from ...posts_.models.post_schema import PostSchema

from marshmallow import fields


ma = get_marshmallow_obj()


class UserSchema(ma.Schema):
    id = fields.UUID()
    username = fields.String()
    handle = fields.String()
    bio = fields.String()
    network = fields.List(fields.Nested(lambda: UserSchema(exclude=('network', 'posts'))))
    date_created = fields.DateTime()
    posts = fields.Nested(PostSchema, many=True, exclude=('author_id',), dump_only=True)
    reposts = fields.List(fields.Nested(lambda: PostSchema))

    class Meta:
        exclude = ('posts', 'reposts',)
