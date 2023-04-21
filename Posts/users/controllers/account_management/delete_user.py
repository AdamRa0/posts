from .. ..database.db import get_db

def del_user(user):
    """
    Deletes user from database

    Arguments
    ---------
    user: user to be deleted
    """

    db = get_db()

    db.session.delete(user)
    db.session.commit()