from ....database.db import get_db
from ...models.user_model import UserModel


db = get_db()


def set_profile_privacy(user: UserModel):
    """
    Sets whether a user's account will be private or not

    Arguments
    ---------
    user: user database object
    """
    if user.is_private:
        user.is_private = False
    else:
        user.is_private = True

    db.session.commit()