from ...database.db import get_marshmallow_obj

from marshmallow import fields


ma = get_marshmallow_obj()


class UserSchema(ma.Schema):
    id = fields.String()
    username = fields.String()
    handle = fields.String()
    bio = fields.String()
    date_created = fields.DateTime()
    profile_image = fields.String()
    banner_image = fields.String()
