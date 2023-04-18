import logging

from .. .models.user_created_response_model import UserCreatedResponseModel
from .. ..database.db import get_db

def get_user(column: str, validator: str):

    """
    Fetch row containing passed arguments

    Arguments
    ---------
    column: name of column to search value
    validator: value to search for
    """

    db_connection = get_db()

    try:
        db_connection.cursor().execute("SELECT * FROM users WHERE %s=%s;", (column, validator))
        db_connection.commit()
        response = db_connection.cursor().fetchone()

        print(response)

        return None
    except Exception as e:
        logging.error(e)