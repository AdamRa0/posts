from ...database.db import get_db
from ...users.controllers.account_creation_and_use.get_user import get_user_by_id


db = get_db()


def sub(user_id: str, subscriber_id: str):
    """
    Subscribe to a user

    Arguments
    ----------
    user_id: id of user to subscribe to
    subscriber_id: id of user subscribing to another user
    """

    subscriber = get_user_by_id(subscriber_id)
    subscribee = get_user_by_id(user_id)

    subscribee.network.append(subscriber)

    db.session.commit()


def unsub(user_id: str, subscriber_id: str):
    """
    Subscribe to a user

    Arguments
    ----------
    user_id: id of user to subsribe to
    subscriber_id: id of user subscribing to another user
    """

    subscriber = get_user_by_id(subscriber_id)
    subscribee = get_user_by_id(user_id)

    subscribee.network.remove(subscriber)

    db.session.commit()