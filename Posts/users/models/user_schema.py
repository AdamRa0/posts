from ...database.db import get_marshmallow_obj

from marshmallow import fields


ma = get_marshmallow_obj()


class UserSchema(ma.Schema):
    username = fields.String()
    handle = fields.String()
    bio = fields.String()
    date_created = fields.DateTime()
    profile_image = fields.String()
