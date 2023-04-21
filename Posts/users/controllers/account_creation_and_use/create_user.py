from .. ..database.db import get_db
from .. .models.data_models.user_model import UserModel
from .. .models.request_models.user_signin import UserIn
from .. .controllers.account_creation_and_use.get_user import get_user_by_handle

def create_new_user(req_body: UserIn):
    """
    Insert new user data to database and return newly created data
    """
    db = get_db()

    new_user: UserModel = UserModel(
        req_body.username,
        req_body.email_address,
        req_body.handle,
        req_body.password
    )

    db.session.add(new_user)
    db.session.commit()

    newly_created_user = get_user_by_handle(req_body.handle)

    return newly_created_user