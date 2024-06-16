from werkzeug.datastructures import FileStorage


def test_get_user_profile_by_handle(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN visiting said user's profile via their handle
    THEN the user's data should be available
    """
    user_handle = create_new_user_1.handle

    response = test_client.get(
        "/api/v1/users/user-handle?handle={}".format(user_handle)
    )

    assert response.status_code == 200
    assert response.json["username"] == create_new_user_1.username
    assert response.json["handle"] == create_new_user_1.handle


def test_get_user_profile_by_authorized_user(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN account owner wants to visit their profile
    THEN account owner has access to their profile
    """

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.get("/api/v1/users/profile", headers=header)

    assert response.status_code == 200
    assert response.json["username"] == create_new_user_1.username
    assert response.json["handle"] == create_new_user_1.handle


def test_get_user_profile_by_unauthorized_user(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN user who isn't registered tries to visit profile
    THEN return unauthorized response
    """
    user_handle = create_new_user_1.handle

    response = test_client.get(
        "/api/v1/users/user-handle?handle={}".format(user_handle)
    )

    test_client.delete_cookie("access_token_cookie")
    test_client.delete_cookie("csrf_access_token")
    test_client.environ_base.clear()

    user_id = response.json["id"]

    response = test_client.get("/api/v1/users/profile?user-id={}".format(user_id))

    assert response.status_code == 200


def test_get_all_users(test_client):
    """
    GIVEN a user
    WHEN a user tries to get all users
    THEN return a success response
    """
    response = test_client.get("/api/v1/users/")

    assert response.status_code == 200


def test_deactivate_user(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a user deactivates their account
    THEN the account is deactivated successfully
    """
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.patch("/api/v1/users/deactivate-account", headers=header)

    assert response.status_code == 200
    assert response.json["message"] == "Account deactivated"


def test_set_account_privacy(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a user changes their account's privacy setting
    THEN the account privacy setting is changed according to a user's preference
    """

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.patch("/api/v1/users/set-account-privacy", headers=header)

    assert response.status_code == 200
    assert response.json["message"] == "Account privacy setting changed"


def test_upload_image(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a user uploads a profile or banner image
    THEN the account's profile or banner image changes
    """

    user_data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=user_data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": f"{authorizer.value}",
    }

    image_file = FileStorage(
        stream=open("tests/suprised_anime_woman.png", "rb"),
        filename="suprised_anime_woman.png",
    )

    data = {"profile_image": True, "file": image_file}

    response = test_client.patch(
        "/api/v1/users/profile/update-image", headers=header, data=data
    )

    assert response.status_code == 200
    assert response.json["message"] == "Image updated"


def test_get_user_subscribers(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a registered user seeks to view their or another registered user's subscribers
    THEN a list of subscribers is presented to them
    """
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {
        "X-CSRF-TOKEN": f"{authorizer.value}",
    }

    response = test_client.get("/api/v1/users/profile", headers=header)

    user_id = response.json["id"]

    sub_response = test_client.get(f"/api/v1/users/subscribers?user-id={user_id}")

    assert sub_response.status_code == 200


def test_get_user_subscribees(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a registered user seeks to view accounts they are subscribed to or
    accounts another registered user is subscribed to
    THEN a list of accounts user or other user subscribes to is presented to them
    """
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {
        "X-CSRF-TOKEN": f"{authorizer.value}",
    }

    response = test_client.get("/api/v1/users/profile", headers=header)

    user_id = response.json["id"]

    subees_response = test_client.get(f"/api/v1/users/subscribees?user-id={user_id}")

    assert subees_response.status_code == 200


def test_get_user_reposts(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a registered user seeks to view their reposts or another user's reposts
    THEN a list of reposts is presented to them
    """
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {
        "X-CSRF-TOKEN": f"{authorizer.value}",
    }

    response = test_client.get("/api/v1/users/profile", headers=header)

    user_id = response.json["id"]

    repost_response = test_client.get(f"/api/v1/users/{user_id}/reposts")

    assert repost_response.status_code == 200


def test_update_user_details(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a user changes their account's details
    THEN the account reflects the changes
    """

    new_user_name = "test_user1"
    new_email_address = "testuser1@example.com"
    new_handle = "@testuser1"

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    form_data = dict(
        username=new_user_name, email_address=new_email_address, handle=new_handle
    )

    response = test_client.patch(
        "/api/v1/users/profile/update", headers=header, data=form_data
    )

    assert response.status_code == 200
    assert response.json["username"] == new_user_name
    assert response.json["handle"] == new_handle


def test_delete_user(create_new_user_1, test_client):
    """
    GIVEN a registered user
    WHEN a user deletes their account
    THEN the account is deleted successfully
    """
    data = dict(
        email_address="testuser1@example.com",
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.delete("/api/v1/users/user/delete", headers=header)

    assert response.status_code == 204
