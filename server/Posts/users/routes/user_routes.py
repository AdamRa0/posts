from collections import defaultdict

from ...app_exception import AppException
from ..controllers.get_user_likes import get_user_approvals

from ..controllers.account_creation_and_use.get_user import (
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
from ..controllers.account_management.change_password import change_password
from ..models.user_schema import UserSchema
from ...utils.upload_file import upload_file

from flask import (
    Blueprint,
    current_app,
    jsonify,
    request,
    Response
)
from flask_jwt_extended import jwt_required, current_user, get_jwt_identity, unset_access_cookies
from sqlalchemy.exc import NoResultFound, SQLAlchemyError


user_routes = Blueprint("user_routes", __name__, url_prefix="/api/v1/users")
user_schema = UserSchema()
users_schemas = UserSchema(many=True)

post_schemas = PostSchema(many=True)


# Route that handles fetching user profile
# Route also handles fetching post author details
@user_routes.route("/profile")
@jwt_required(optional=True)
def get_user_profile():
    try:
        logged_in_user = get_jwt_identity()
        queried_user = request.args.get("user-id")

        if logged_in_user and queried_user is None:
            return user_schema.dump(current_user), 200

        user = get_user_by_id(queried_user)

        return user_schema.dump(user), 200
    except NoResultFound as e:
        raise AppException(
            user_message="User not found",
            internal_message=f"Not Found: {str(e)}",
            status_code=404,
        )


@user_routes.route("/change-password", methods=["PATCH"])
@jwt_required()
def change_user_password():
    new_password = request.form.get("new_password")

    change_password(current_user.id, new_password)

    return jsonify({"message": "Password change successful"}), 200


@user_routes.route("/")
def get_all_users():
    users = get_all_registered_users()

    return users_schemas.dump(users), 200


@user_routes.route("/user/delete", methods=["DELETE"])
@jwt_required()
def delete_user():
    try:
        del_user(current_app, current_user)

        response: Response = jsonify({})

        unset_access_cookies(response)

        return response, 204
    except SQLAlchemyError as e:
        raise AppException(
            user_message="Could not delete application. Please try again",
            internal_message=f"SQLAlchemyError: {str(e)}",
            status_code=500
        )


@user_routes.route("/deactivate-account", methods=["PATCH"])
@jwt_required()
def deactivate_user():
    try:
        account_activation_manager(current_user)

        return jsonify({"message": "Account deactivated"}), 200
    except SQLAlchemyError as e:
        raise AppException(
            user_message="Could not deactivate account. Please try again",
            internal_message=f"SQLAlchemyError: {str(e)}",
            status_code=500,
        )


@user_routes.route("/set-account-privacy", methods=["PATCH"])
@jwt_required()
def set_account_privacy():
    set_profile_privacy(current_user)

    return jsonify({"message": "Account privacy setting changed"}), 200


@user_routes.route("/profile/update", methods=["PATCH"])
@jwt_required()
def update_user_details():
    try:
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
    except SQLAlchemyError as e:
        raise AppException(
            user_message="Could not change details. Please try again",
            internal_message=f"SQLAlchemyError: {str(e)}",
            status_code=500
        )


@user_routes.route("/profile/update-image", methods=["PATCH"])
@jwt_required()
def update_user_images():
    """
    Updates user profile or banner image
    """
    profile_image = request.form.get("profile_image")
    banner_image = request.form.get("banner_image")
    filenames = defaultdict(str)

    if request.files:
        filenames = upload_file()

    if filenames is not None and profile_image == "True":
        change_profile_image(current_app, current_user, filenames.get("profile_image"))

    if filenames is not None and banner_image == "True":
        change_banner_image(current_app, current_user, filenames.get("banner_image"))

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
@jwt_required(optional=True)
def subscribers_to_user():
    try:
        query_params = request.args

        user_id = query_params.get("user-id") if query_params else current_user.id

        subscribers = get_subscribers(user_id)

        return users_schemas.dump(subscribers), 200
    except NoResultFound as e:
        raise AppException(
            user_message="User not found",
            internal_message=f"NoResutFound: {str(e)}",
            status_code=404
        )


@user_routes.route("/subscribees")
@jwt_required(optional=True)
def users_subscribed_by_user():
    try:
        query_params = request.args

        user_id = query_params.get("user-id") if query_params else current_user.id

        subscribees = get_subscribees(user_id)

        return users_schemas.dump(subscribees), 200
    except NoResultFound as e:
        raise AppException(
            user_message="User not found",
            internal_message=f"NoResutFound: {str(e)}",
            status_code=404
        )


@user_routes.route("/<user_id>/likes")
@jwt_required()
def get_user_likes(user_id: str):
    try:
        likes = get_user_approvals(user_id)

        return post_schemas.dump(likes), 200
    except NoResultFound as e:
        raise AppException(user_message="User not found", status_code=404)


@user_routes.route("/<user_id>/reposts")
@jwt_required()
def get_user_reposts(user_id: str):
    try:
        reposts = get_reposts_by_user(user_id)

        return post_schemas.dump(reposts), 200
    except NoResultFound as e:
        raise AppException(user_message="User not found", status_code=404)
