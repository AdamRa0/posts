from Posts.users.models.user_model import UserModel


USERNAME: str = "exampleuser"
EMAIL_ADDRESS: str = "exampleuser@example.com"
HANDLE: str = "@exampleuser"
PASSWORD: str = "secret12345"


def test_new_user():
    """
    GIVEN a User Model
    WHEN a new user is about to be created
    CHECK username, email_address, password and handle are equal to given values
    """
    

    new_test_user = UserModel(USERNAME, EMAIL_ADDRESS, HANDLE, PASSWORD)

    assert new_test_user.username == USERNAME
    assert new_test_user.email_address == EMAIL_ADDRESS
    assert new_test_user.handle == HANDLE
    assert new_test_user.password == PASSWORD


def test_new_user_with_fixture(create_new_user_1, create_new_user_2):
    assert create_new_user_1.username == USERNAME
    assert create_new_user_1.email_address == EMAIL_ADDRESS
    assert create_new_user_1.handle == HANDLE
    assert create_new_user_1.password == PASSWORD

    assert create_new_user_2.username == f"{USERNAME}2"
    assert create_new_user_2.email_address != EMAIL_ADDRESS
    assert create_new_user_2.handle == f"{HANDLE}2"
    assert create_new_user_2.password == PASSWORD
