from .. .database.db import ma

from marshmallow import fields


class PostSchema(ma.Schema):
    id = fields.UUID()
    body = fields.String()
    author_id = fields.UUID()
    approvals = fields.Int()
    disapprovals = fields.Int()
    reposts = fields.Int()
    comments = fields.Int()
    time_created = fields.DateTime()
    time_edited = fields.DateTime()