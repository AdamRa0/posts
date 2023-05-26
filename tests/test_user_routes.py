def test_get_user_profile_by_handle(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN visiting said user's profile via their handle
    THEN the user's data should be available
    """
    user_handle = create_new_user_1.handle

    response = test_client.get('/api/v1/users/{}'.format(user_handle))

    assert response.status_code == 200
    assert response.json['username'] == create_new_user_1.username
    assert response.json['handle'] == create_new_user_1.handle


def test_get_user_profile_by_authorized_user(store_user_fixture, create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN account owner wants to visit their profile
    THEN account owner has access to their profile
    """
    authorizer = test_client.get_cookie('csrf_access_token')

    header = {
        'X-CSRF-TOKEN': authorizer
    }

    response = test_client.get('/api/v1/users/profile', headers=header)

    assert response.status_code == 200
    assert response.json['username'] == create_new_user_1.username
    assert response.json['handle'] == create_new_user_1.handle


def test_get_user_profile_by_unauthorized_user(test_client):
    """
    GIVEN a registered user
    WHEN user who isn't registered tries to visit profile
    THEN return unauthorized response
    """
    test_client.delete_cookie('access_token_cookie')
    test_client.delete_cookie('csrf_access_token')
    test_client.environ_base.clear()

    response = test_client.get('/api/v1/users/profile')

    assert response.status_code == 401


def test_get_all_users(test_client):
    """
    GIVEN a user
    WHEN a user tries to get all users
    THEN return a success response
    """
    response = test_client.get('/api/v1/users/')

    assert response.status_code == 200


