"""
This file contains a placeholder function for creating test users.
Should not be used for creating accounts.
"""

import logging

from .. ..database.db import get_db
from .. ..users.models.user_model import UserModel

from psycopg2.extras import register_uuid

register_uuid()

def create_user_controller(req_body: UserModel):
    """
    Creates test user and returns newly created test user

    Arguments
    ---------
    req_body: UserModel that serves as data abstraction of request body.
    """
    db_connection = get_db()

    try:
        db_connection.cursor().execute("""
            INSERT INTO users (id, email_address, password, handle, username) VALUES (%s, %s, %s, %s, %s);""", 
            (req_body.id, req_body.email, req_body.password, req_body.handle, req_body.username)
        )

        db_connection.commit()
    except Exception as e:
        logging.error(e)
