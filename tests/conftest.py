import os
import pytest
from flask_jwt_extended import create_access_token
from Posts import create_app
from Posts.database.db import get_db
from Posts.users.models.user_model import UserModel


db = get_db()


@pytest.fixture(scope='module')
def test_client():
    os.environ['CONFIG_TYPE'] = 'config.TestingConfig'
    my_app = create_app()

    with my_app.test_client() as testing_client:
        with my_app.app_context():
            yield testing_client


@pytest.fixture(scope='module')
def init_db(test_client):
    db.create_all()

    yield

    db.drop_all()

