from ...users.models.user_schema import UserSchema
from ...database.db import ma

from marshmallow import fields


class PostSchema(ma.Schema):
    id = fields.UUID()
    body = fields.String()
    author_id = fields.UUID()
    approvals = fields.Int()
    disapprovals = fields.Int()
    reposts = fields.Int()
    comments = fields.Int()
    parent = fields.Nested(lambda: PostSchema(exclude=("children",)))
    parent_id = fields.UUID()
    children = fields.List(fields.Nested(lambda: PostSchema))
    liked_by = fields.List(fields.Nested(lambda: UserSchema))
    disliked_by = fields.List(fields.Nested(lambda: UserSchema))
    reposted_by = fields.List(fields.Nested(lambda: UserSchema))
    time_created = fields.DateTime()
    time_edited = fields.DateTime()
    post_file = fields.String()
