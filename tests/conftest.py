import os
import pytest
from flask_jwt_extended import create_access_token
from Posts import create_app
from Posts.users.models.user_model import UserModel
from Posts.users.controllers.account_creation_and_use.get_user import get_user_by_handle
from Posts.database.db import get_db
from Posts.users.controllers.account_creation_and_use.create_user import create_new_user
from Posts.users.controllers.account_creation_and_use.get_user import get_user_by_handle


db = get_db()


@pytest.fixture(scope="module")
def test_client():
    os.environ["CONFIG_TYPE"] = "config.TestingConfig"
    my_app = create_app()

    with my_app.test_client() as testing_client:
        with my_app.app_context():
            yield testing_client


@pytest.fixture(scope="module")
def init_db(test_client):
    db.create_all()

    yield

    db.drop_all()


@pytest.fixture(scope="module")
def create_new_user_1(test_client):
    new_user: UserModel = UserModel(
        "exampleuser", "exampleuser@example.com", "@exampleuser", "secret12345"
    )

    return new_user


@pytest.fixture(scope="module")
def create_new_user_2(test_client):
    new_user: UserModel = UserModel(
        "exampleuser2", "exampleuser@example2.com", "@exampleuser2", "secret12345"
    )

    return new_user



@pytest.fixture(scope='module')
def cli_test_client():
    os.environ['CONFIG_TYPE'] = 'config.TestingConfig'
    my_app = create_app()

    runner = my_app.test_cli_runner()

    yield runner