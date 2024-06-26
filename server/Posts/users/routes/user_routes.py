from ..controllers.account_creation_and_use.get_user import (
    get_user_by_handle,
    get_user_by_id,
    get_all_registered_users,
)
from ...follow.controllers.sub_unsub import (
    sub,
    unsub,
    add_to_waitlist,
    judge_waiting_user,
)
from ...follow.controllers.get_sub_subees import get_subscribers, get_subscribees
from ...posts_.controllers.get_posts import get_reposts_by_user
from ...posts_.models.post_schema import PostSchema
from ..controllers.account_management.delete_user import del_user
from ..controllers.account_management.profile_customization import (
    change_username,
    change_handle,
    change_email_address,
    change_profile_image,
    change_banner_image,
)
from ..controllers.account_management.deactivate_reactivate_user import (
    account_activation_manager,
)
from ..controllers.account_management.set_unset_account_private import (
    set_profile_privacy,
)
from ..models.user_schema import UserSchema
from ...utils.upload_file import upload_file

from flask import (
    Blueprint,
    current_app,
    jsonify,
    request,
)
from flask_jwt_extended import jwt_required, current_user, get_jwt_identity


user_routes = Blueprint("user_routes", __name__, url_prefix="/api/v1/users")
user_schema = UserSchema()
users_schemas = UserSchema(many=True)

post_schemas = PostSchema(many=True)


@user_routes.route("/user-handle")
def get_user_profile_by_handle():
    user_handle = request.args.get("handle")
    user = get_user_by_handle(user_handle)

    user_subscribers = get_subscribers(user.id)

    if user is None:
        return jsonify({"message": "User not found", "status": "fail"}), 404

    if user.is_active is False:
        return jsonify({"message": "User no longer active"}), 403

    if user.is_private and current_user not in user_subscribers:
        return (
            jsonify(
                {
                    "message": "Account and its content are available only to approved subscribers"
                }
            ),
            403,
        )

    return user_schema.dump(user), 200


# Route that handles fetching user profile
# Route also handles fetching post author details
@user_routes.route("/profile")
@jwt_required(optional=True)
def get_user_profile():
    logged_in_user = get_jwt_identity()
    queried_user = request.args.get("user-id")

    if logged_in_user and queried_user is None:
        return user_schema.dump(current_user), 200

    user = get_user_by_id(queried_user)

    return user_schema.dump(user), 200


@user_routes.route("/")
def get_all_users():
    users = get_all_registered_users()

    return users_schemas.dump(users), 200


@user_routes.route("/user/delete", methods=["DELETE"])
@jwt_required()
def delete_user():
    del_user(current_app, current_user)

    return jsonify({}), 204


@user_routes.route("/deactivate-account", methods=["PATCH"])
@jwt_required()
def deactivate_user():
    account_activation_manager(current_user)

    return jsonify({"message": "Account deactivated"}), 200


@user_routes.route("/set-account-privacy", methods=["PATCH"])
@jwt_required()
def set_account_privacy():
    set_profile_privacy(current_user)

    return jsonify({"message": "Account privacy setting changed"}), 200


@user_routes.route("/profile/update", methods=["PATCH"])
@jwt_required()
def update_user_details():
    username = request.form.get("username")
    email_address = request.form.get("email_address")
    handle = request.form.get("handle")

    if username is not None and username != current_user.username:
        change_username(current_user, username)
    if email_address is not None and username != current_user.email_address:
        change_email_address(current_user, email_address)
    if handle is not None != current_user.handle:
        change_handle(current_user, handle)

    updated_user = get_user_by_id(current_user.id)

    return user_schema.dump(updated_user), 200


@user_routes.route("/profile/update-image", methods=["PATCH"])
@jwt_required()
def update_user_images():
    """
    Updates user profile or banner image
    """
    profile_image = request.form.get("profile_image")
    banner_image = request.form.get("banner_image")

    if request.files:
        filename = upload_file()

    if filename is not None and profile_image is True:
        change_profile_image(current_app, current_user, filename)

    if filename is not None and banner_image is True:
        change_banner_image(current_app, current_user, filename)

    return jsonify({"message": "Image updated"}), 200


@user_routes.route("/<user_id>/subscribe", methods=["PATCH"])
@jwt_required()
def subscribe_to_user(user_id: str):
    # TODO: Write unit test for this route at a later date
    # TODO: Add rerouting function to wait list route if user to subscribe to sets account to private
    sub(user_id, current_user.id)

    return jsonify({"status": "success"}), 200


@user_routes.route("/<user_id>/unsubscribe", methods=["PATCH"])
@jwt_required()
def unsubscribe_to_user(user_id: str):
    # TODO: Write unit test for this route at a later date
    unsub(user_id, current_user.id)

    return jsonify({"status": "success"}), 200


@user_routes.route("/<user_id>/add-to-waitlist", methods=["POST"])
@jwt_required()
def add_to_user_waitlist(user_id: str):
    # TODO: Write unit test for this route at a later date
    add_to_waitlist(user_id, current_user.id)

    return jsonify({"message": "Please wait approval from user"}), 200


@user_routes.route("/approve-user", methods=["PATCH"])
@jwt_required()
def vet_user():
    # TODO: Write unit test for this route at a later date
    pending_subscriber = request.json.get("pending_sub")
    approve = request.json.get("approve")

    judge_waiting_user(current_user.id, pending_subscriber, approve)

    return jsonify({"message": "success"}), 200


@user_routes.route("/subscribers")
@jwt_required()
def subscribers_to_user():
    query_params = request.args

    user_id = query_params.get("user-id") if query_params else current_user.id

    subscribers = get_subscribers(user_id)

    return users_schemas.dump(subscribers), 200


@user_routes.route("/subscribees")
@jwt_required()
def users_subscribed_by_user():
    query_params = request.args

    user_id = query_params.get("user-id") if query_params else current_user.id

    subscribees = get_subscribees(user_id)

    return users_schemas.dump(subscribees), 200


@user_routes.route("/<user_id>/reposts")
@jwt_required()
def get_user_reposts(user_id: str):
    reposts = get_reposts_by_user(user_id)

    return post_schemas.dump(reposts), 200
