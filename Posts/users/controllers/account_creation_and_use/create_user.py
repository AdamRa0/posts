from .. ..database.db import get_db
from .. .models.data_models.user_model import UserModel
from .. .models.request_models.user_signin import UserIn

def create_new_user(req_body: UserIn):
    """
    Insert new user data to database
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