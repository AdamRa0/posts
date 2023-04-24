from ....database.db import get_marshmallow_obj
from .. ..posts_.models.post_schema import PostSchema

from marshmallow import fields

ma = get_marshmallow_obj()

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'handle', 'email_address', 'bio', 'followers', 'following', 'date_created')

    posts = fields.Nested(PostSchema, many=True)