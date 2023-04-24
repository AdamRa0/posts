from ....database.db import get_marshmallow_obj

ma = get_marshmallow_obj()

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'handle', 'email_address', 'bio', 'followers', 'following', 'date_created')