import pytest
from json import loads, dumps
from Posts import create_app
from Posts.users.controllers.account_creation_and_use.create_user import create_new_user
from Posts.users.models.user_model import UserModel
from Posts.database.db import get_db
from Posts.users.controllers.account_creation_and_use.get_user import get_user_by_handle


db = get_db()


@pytest.fixture(scope="module")
def test_client():
    my_app = create_app()
    my_app.config["TESTING"] = True
    my_app.config["DEBUG"] = True

    with my_app.test_client() as testing_client:
        with my_app.app_context():
            yield testing_client


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


@pytest.fixture(scope="module")
def remove_user_if_exists(create_new_user_1, test_client):
    existing_user = get_user_by_handle(create_new_user_1.handle)
    if existing_user is not None:
        db.session.delete(existing_user)
        db.session.commit()


@pytest.fixture(scope="module")
def store_user_fixture(create_new_user_1, test_client):
    data = dict(
        username=create_new_user_1.username,
        email_address=create_new_user_1.email_address,
        handle=create_new_user_1.handle,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signup", data=data)
