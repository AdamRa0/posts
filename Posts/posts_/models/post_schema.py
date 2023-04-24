from .post_model import PostModel
from .. .database.db import ma

class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PostModel