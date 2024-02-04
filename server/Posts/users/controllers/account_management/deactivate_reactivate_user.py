from ....database.db import get_db
from ...models.user_model import UserModel


db = get_db()


def account_activation_manager(user: UserModel):
    """
    Deactivates or reactivates a user's account

    Arguments:

    """
    if user.is_active:
        user.is_active = False
    else:
        user.is_active = True

    db.session.commit()
