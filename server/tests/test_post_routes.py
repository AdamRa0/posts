from json import loads, dumps


def test_create_new_post(create_new_user_1, test_client):
    """
    GIVEN a registered user,
    WHEN a signed in user creates a new post,
    THEN the post and its information is returned.
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

    data = {"body": "Test post."}

    response = test_client.post("/api/v1/posts/create_post", data=data, headers=header)

    assert response.status_code == 201
    assert response.json["body"] == data["body"]


def test_get_all_posts(test_client):
    """
    GIVEN a user,
    WHEN a user visits the first page of the site,
    THEN a list of posts is presented to the user.
    """
    response = test_client.get("/api/v1/posts/?page=1")

    assert response.status_code == 200


def test_get_single_post(test_client):
    """
    GIVEN a user,
    WHEN a user wants to see a single post,
    THEN the post is presented to user.
    """
    posts_response = test_client.get("/api/v1/posts/?page=1")

    post_id = posts_response.json[0]["id"]

    post_response = test_client.get(f"/api/v1/posts/{post_id}")

    assert post_response.status_code == 200


def test_get_user_posts(create_new_user_1, test_client):
    """
    GIVEN a user,
    WHEN a user wants to see another user's posts,
    THEN the user is presented with a list of other user's posts.
    """
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.get("/api/v1/users/profile", headers=header)

    user_id = response.json["id"]

    user_posts_response = test_client.get(
        f"/api/v1/posts/user-posts?user-id={user_id}&page=1"
    )

    print(user_posts_response.json)

    assert user_posts_response.status_code == 200


def test_get_user_replies(create_new_user_1, test_client):
    """
    GIVEN a user,
    WHEN a user wants to see another user's replies,
    THEN the user is presented with a list of other user's replies.
    """
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.get("/api/v1/users/profile", headers=header)

    user_id = response.json["id"]

    user_replies_response = test_client.get(
        f"/api/v1/posts/user-replies?user-id={user_id}"
    )

    print(user_replies_response.json)

    assert user_replies_response.status_code == 200


def test_get_user_media(create_new_user_1, test_client):
    """
    GIVEN a user,
    WHEN a user wants to see another user's media,
    THEN the user is presented with a list of other user's media.
    """
    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.get("/api/v1/users/profile", headers=header)

    user_id = response.json["id"]

    user_replies_response = test_client.get(
        f"/api/v1/posts/user-media?user-id={user_id}"
    )

    print(user_replies_response.json)

    assert user_replies_response.status_code == 200


def test_update_post(create_new_user_1, test_client):
    """
    GIVEN a post,
    WHEN the post's owner seeks to edit their post,
    THEN their post is edited.
    """
    posts = test_client.get("/api/v1/posts/?page=1")
    post_to_update_id = posts.json[0]["id"]

    updated_post = {"id": post_to_update_id, "body": "Updated test post"}

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.patch(
        "/api/v1/posts/update_post", headers=header, json=loads(dumps(updated_post))
    )

    assert response.status_code == 200
    assert response.json["body"] == updated_post["body"]


def test_post_approval(create_new_user_1, test_client):
    """
    GIVEN a post,
    WHEN a user seeks to approve the post,
    THEN the post is approved.
    """
    posts = test_client.get("/api/v1/posts/?page=1")
    post_to_approve_id = posts.json[0]["id"]

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.patch(
        f"/api/v1/posts/{post_to_approve_id}/approve", headers=header
    )

    assert response.status_code == 200
    assert response.json["status"] == "success"


def test_post_disapproval(create_new_user_1, test_client):
    """
    GIVEN a post,
    WHEN a user seeks to disapprove the post,
    THEN the post is disapproved.
    """
    posts = test_client.get("/api/v1/posts/?page=1")
    post_to_approve_id = posts.json[0]["id"]

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.patch(
        f"/api/v1/posts/{post_to_approve_id}/disapprove", headers=header
    )

    assert response.status_code == 200
    assert response.json["status"] == "success"


def test_post_repost(create_new_user_1, test_client):
    """
    GIVEN a post,
    WHEN a user seeks to repost the post,
    THEN the post is reposted.
    """
    posts = test_client.get("/api/v1/posts/?page=1")
    post_to_repost_id = posts.json[0]["id"]

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.patch(
        f"/api/v1/posts/{post_to_repost_id}/repost", headers=header
    )

    assert response.status_code == 200
    assert response.json["status"] == "success"


def test_remove_post_repost(create_new_user_1, test_client):
    """
    GIVEN a post,
    WHEN a user seeks to remove their repost to the post,
    THEN the repost is removed.
    """
    posts = test_client.get("/api/v1/posts/?page=1")
    post_to_remove_repost_id = posts.json[0]["id"]

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.patch(
        f"/api/v1/posts/{post_to_remove_repost_id}/remove-repost", headers=header
    )

    assert response.status_code == 200
    assert response.json["status"] == "success"


def test_comment_on_post(create_new_user_1, test_client):
    """
    GIVEN a post,
    WHEN a user seeks to comment on it,
    THEN the post has the user's comment on it.
    """
    posts = test_client.get("/api/v1/posts/?page=1")
    post_to_comment_on_id = posts.json[0]["id"]

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

    data = {"body": "Test comment."}

    response = test_client.post(
        f"/api/v1/posts/{post_to_comment_on_id}/create-comment",
        data=data,
        headers=header,
    )

    assert response.status_code == 201
    assert response.json["status"] == "success"


def test_delete_post(create_new_user_1, test_client):
    """
    GIVEN a post,
    WHEN the posts owner deletes the post,
    THEN the post is deleted.
    """
    posts = test_client.get("/api/v1/posts/?page=1")
    post_to_delete_id = posts.json[0]["id"]

    data = dict(
        email_address=create_new_user_1.email_address,
        password=create_new_user_1.password,
    )

    test_client.post("/api/v1/auth/signin", data=data)

    authorizer = test_client.get_cookie("csrf_access_token")

    header = {"X-CSRF-TOKEN": f"{authorizer.value}"}

    response = test_client.delete(f"/api/v1/posts/{post_to_delete_id}", headers=header)

    assert response.status_code == 204
