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
    parent_id = fields.UUID()
    children = fields.List(fields.Nested(lambda: PostSchema))
    time_created = fields.DateTime()
    time_edited = fields.DateTime()
