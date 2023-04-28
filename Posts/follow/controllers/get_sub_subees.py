from ...database.db import get_db
from ...users.controllers.account_creation_and_use.get_user import get_user_by_id

from ..models.follow_model import subscribers
from .. .users.models.user_model import UserModel

db = get_db()

def get_subscribers(user_id: str):

    return db.session.execute(
        db.select(UserModel).join(subscribers, 
            subscribers.c.subscribee_id == user_id)
            .where(subscribers.c.subscriber_id != user_id)
            .where(UserModel.id != user_id)).scalars()


def get_subscribees(user_id: str):

    return db.session.execute(
        db.select(UserModel).join(subscribers, 
        subscribers.c.subscribee_id != user_id)
        .where(subscribers.c.subscriber_id == user_id)
        .where(UserModel.id != user_id)).scalars()