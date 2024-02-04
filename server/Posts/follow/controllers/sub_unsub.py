# This file consists of all db operations concerning subbing and unsubbing from a user

from ...database.db import get_db
from ...users.controllers.account_creation_and_use.get_user import get_user_by_id
from ...users.models.user_model import users_subscribers_waitlist


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
    Unsubscribe from a user

    Arguments
    ----------
    user_id: id of user to subsribe to
    subscriber_id: id of user subscribing to another user
    """

    subscriber = get_user_by_id(subscriber_id)
    subscribee = get_user_by_id(user_id)

    subscribee.network.remove(subscriber)

    db.session.commit()


def add_to_waitlist(user_id: str, subscriber_id: str):
    """
    If subcribee is private, add subcriber to waitlist pending approval

    Arguments
    ---------
    user_id: id of private user to subscribe to
    subscriber_id: id of user wishing to subcribe to a private user
    """
    subscriber = get_user_by_id(subscriber_id)
    subscribee = get_user_by_id(user_id)

    subscribee.waitlist.append(subscriber)

    db.session.commit()


def judge_waiting_user(user_id: str, subscriber_id: str, approve: bool):
    """
    Function to approve or disapprove a waiting user.

    Arguments
    ---------
    approve: boolean value to approve or disapprove user
    user_id: id of private user to subscribe to
    subscriber_id: id of user wishing to subcribe to a private user
    """
    if approve:
        sub(user_id, subscriber_id)

    waiting_user_row = db.session.execute(
        db.select(users_subscribers_waitlist)
        .where(users_subscribers_waitlist.c.judge == user_id)
        .where(users_subscribers_waitlist.c.judged == subscriber_id)
    ).fetchone()

    db.session.delete(waiting_user_row)
    db.session.commit()
