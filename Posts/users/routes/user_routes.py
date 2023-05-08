from ..controllers.account_creation_and_use.get_user import (
    get_user_by_handle,
    get_user_by_id,
    get_all_registered_users,
)
from ...follow.controllers.sub_unsub import sub, unsub
from ...follow.controllers.get_sub_subees import get_subscribers, get_subscribees
from ...posts_.controllers.get_posts import get_reposts_by_user
from ...posts_.models.post_schema import PostSchema
from ..controllers.account_management.delete_user import del_user
from ..controllers.account_management.profile_customization import (
    change_username,
    change_handle,
    change_email_address,
    change_profile_image,
)
from ..models.user_schema import UserSchema
from ...utils.upload_file import upload_file
from ...utils.show_true_path import show_true_path

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, current_user


user_routes = Blueprint("user_routes", __name__, url_prefix="/api/v1/users")
user_schema = UserSchema()
users_schemas = UserSchema(many=True)

post_schemas = PostSchema(many=True)


@user_routes.route("/<user_handle>")
def get_user_profile_by_handle(user_handle: str):
    user = get_user_by_handle(user_handle)

    user.profile_image = show_true_path(user.profile_image)

    if user is None:
        return jsonify({"message": "User not found", "status": "fail"}), 404

    return user_schema.dump(user), 200


@user_routes.route("/profile")
@jwt_required()
def get_user_profile():
    current_user.profile_image = show_true_path(current_user.profile_image)

    return user_schema.dump(current_user), 200


@user_routes.route("/")
def get_all_users():
    users = get_all_registered_users()
    updated_users = []

    for user in users:
        user.profile_image = show_true_path(user.profile_image)
        updated_users.append(user)

    return users_schemas.dump(updated_users), 200


@user_routes.route("/user/delete", methods=["DELETE"])
@jwt_required()
def delete_user():
    del_user(current_user)

    return jsonify({}), 204


@user_routes.route("/profile/update", methods=["PATCH"])
@jwt_required()
async def update_user_details():
    username = request.json.get("username")
    email_address = request.json.get("email_address")
    handle = request.json.get("handle")

    if request.files:
        filename = await upload_file()

    if username is not None:
        change_username(current_user, username)
    if email_address is not None:
        change_email_address(current_user, email_address)
    if handle is not None:
        change_handle(current_user, handle)
    if filename is not None:
        change_profile_image(current_user, filename)

    updated_user = get_user_by_id(current_user.id)

    return user_schema.dump(updated_user), 200


@user_routes.route("/<user_id>/subscribe", methods=["PATCH"])
@jwt_required()
def subscribe_to_user(user_id: str):
    sub(user_id, current_user.id)

    return jsonify({"status": "success"}), 200


@user_routes.route("/<user_id>/unsubscribe", methods=["PATCH"])
@jwt_required()
def unsubscribe_to_user(user_id: str):
    unsub(user_id, current_user.id)

    return jsonify({"status": "success"}), 200


@user_routes.route("/<user_id>/subscribers")
@jwt_required()
def subscribers_to_user(user_id: str):
    subscribers = get_subscribers(user_id)

    return users_schemas.dump(subscribers), 200


@user_routes.route("/<user_id>/subscribees")
@jwt_required()
def users_subscribed_by_user(user_id: str):
    subscribees = get_subscribees(user_id)

    return user_schema.dump(subscribees), 200


@user_routes.route("/<user_id>/reposts")
@jwt_required()
def get_user_reposts(user_id: str):
    reposts = get_reposts_by_user(user_id)

    return post_schemas.dump(reposts), 200
