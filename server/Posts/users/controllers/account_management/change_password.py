from ....database.db import get_db
from ..account_creation_and_use.get_user import get_user_by_id

from werkzeug.security import generate_password_hash

db = get_db()


def change_password(user_id: str, password: str) -> None:
    user = get_user_by_id(user_id)
    hashed_password = generate_password_hash(password)

    user.password = hashed_password

    db.session.commit()