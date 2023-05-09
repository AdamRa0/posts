from ....database.db import get_db
from ...models.user_model import UserModel


db = get_db()


def deactivate_account(user: UserModel):
    """
    Deactivates a user's account
    """

    user.is_active = False

    db.session.commit()


def reactivate_account(user: UserModel):
    """
    Reactivates a user account if the login again.
    """
    user.is_active = True

    db.session.commit()