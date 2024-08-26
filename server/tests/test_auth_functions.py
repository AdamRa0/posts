def test_signin_functionality(store_user_fixture, create_new_user_1, test_client):
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    response = test_client.post("/api/v1/auth/signin", data=data)

    print(response)

    assert response.status_code == 200


def test_signin_functionality_401_on_wrong_credentials(create_new_user_1, test_client):
    data = dict(
        email_address=create_new_user_1.email_address,
        password="someuser",
    )

    response = test_client.post("/api/v1/auth/signin", data=data)

    print(response)

    assert response.status_code == 401


def test_signin_functionality_404_on_nonexistent_credentials(test_client):
    data = dict(
        email_address="sadakayacitam@example.com",
        password="someuser",
    )

    response = test_client.post("/api/v1/auth/signin", data=data)

    print(response)

    assert response.status_code == 404


def test_signout_functionality(test_client):
    response = test_client.post("api/v1/auth/signout")

    assert response.status_code == 200
