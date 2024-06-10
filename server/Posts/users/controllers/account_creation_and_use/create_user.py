from ....database.db import get_db
from ...models.user_model import UserModel
from ....auth.models.user_signup import UserSignUp
from ...controllers.account_creation_and_use.get_user import get_user_by_handle

from werkzeug.security import generate_password_hash


def create_new_user(form: UserSignUp):
    """
    Insert new user data to database and return newly created data
    """
    db = get_db()

    hashed_password = generate_password_hash(form.password)

    new_user: UserModel = UserModel(
        form.username, form.email_address, form.handle, hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    newly_created_user = get_user_by_handle(form.handle)

    return newly_created_user
