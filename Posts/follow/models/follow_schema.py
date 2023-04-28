from .. .database.db import get_marshmallow_obj
from .. .users.models.user_schema import UserSchema

from marshmallow import fields


ma = get_marshmallow_obj()


class UserSubscribersSchema(ma.Schema):
    subscribers = fields.Nested(UserSchema, many=True)

    class Meta:
        fields = ('username', 'handle')

class UserSubscribeesSchema(ma.Schema):
    subscribees = fields.Nested(UserSchema, many=True)

    class Meta:
        fields = ('username', 'handle')
