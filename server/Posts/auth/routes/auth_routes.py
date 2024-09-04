from ...users.controllers.account_management.change_password import change_password
from ...app_exception import AppException
from ...database.db import jwt, mail
from ..models.user_signup import UserSignUp
from ..models.user_signin import UserSignIn
from ...users.controllers.account_creation_and_use.create_user import create_new_user
from ...users.controllers.account_creation_and_use.get_user import (
    get_user_by_email,
    get_user_by_id,
)
from ...users.controllers.account_management.deactivate_reactivate_user import (
    account_activation_manager,
)

from flask import Blueprint, jsonify, Response, request
from flask_pydantic import validate
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies,
    unset_access_cookies,
)
from flask_mail import Message #type: ignore
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from werkzeug.security import check_password_hash


auth_routes = Blueprint("auth_routes", __name__, url_prefix="/api/v1/auth")

COOKIE_MAX_AGE: int = 172800


@jwt.user_identity_loader
def user_identity_lookup(user_id: str):
    """
    Takes in user_id passed as identity in jwt.
    Returns user_id as JSON
    """
    return user_id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    """
    Loads user from db whenever a protected route is accessed
    """
    user_id = jwt_data["sub"]
    return get_user_by_id(user_id)


@auth_routes.route("/signup", methods=["POST"])
@validate()
def signup_user(form: UserSignUp):

    try:
        newly_created_user = create_new_user(form)
        access_token: str = create_access_token(identity=newly_created_user.id)

        response: Response = jsonify({"status": "success"})

        set_access_cookies(response, access_token, max_age=COOKIE_MAX_AGE)

        return response, 201
    except SQLAlchemyError as e:
        raise AppException(
            user_message="Failed to create new user. Try again",
            internal_message=f"SQLAlchemry Error: {str(e)}",
            status_code=500,
        )


@auth_routes.route("/signin", methods=["POST"])
@validate()
def signin_user(form: UserSignIn):
    try:
        user = get_user_by_email(form.email_address)
        if user and not check_password_hash(user.password, form.password):
            raise AppException(
                user_message="Your email or password might be wrong. Please try again.",
                internal_message="Unsuccessful login attempt: wrong password",
                status_code=401,
            )

        if user.is_active is False:
            account_activation_manager(user)

        access_token: str = create_access_token(identity=user.id)

        response: Response = jsonify({"status": "success"})

        set_access_cookies(response, access_token, max_age=COOKIE_MAX_AGE)

        return response, 200
    except NoResultFound as e:
        raise AppException(
            user_message="User not found. Try again",
            internal_message=f"SQLAlchemry Error: {str(e)}",
            status_code=404,
        )


@auth_routes.route("/signout", methods=["POST"])
def signout_user():
    try:
        response: Response = jsonify({"status": "logged out successfully"})

        unset_access_cookies(response)

        return response, 200
    except Exception as e:
        raise AppException(
            user_message="Something went wrong.",
            internal_message=f"Internal server error: {str(e)}",
            status_code=500
        )


@auth_routes.route("/forgot-username", methods=['POST'])
def forgot_username():
    email_address = request.form.get("email_address")

    user = get_user_by_email(email_address)

    if not user:
        raise AppException(
            user_message="User not found.",
            status_code=404
        )

    try:
        msg = Message(subject="Retrieved username", sender="posts@posts.io", recipients=[str(user.email_address)])

        msg.body = f"""
        Your recovered username is {user.username}

        Please do not send an email to this address.
        """

        mail.send(msg)

        return jsonify({ "status": "success" }), 200
    except Exception as e:
        raise AppException(
            user_message="Could not send mail. Please try again.",
            internal_message=str(e),
            status_code=500
        )


@auth_routes.route("/reset-password", methods=['POST', 'PATCH'])
def reset_password():
    if request.method == "POST":
        try:
            username = request.form.get("username")
            email_address = request.form.get("email_address")
            user = get_user_by_email(email_address) 

            if not user or user.username != username:
                raise AppException(
                    user_message="User not found.",
                    internal_message="User not found",
                    status_code=404
                )
            msg = Message(subject="Reset Password", sender="posts@posts.io", recipients=[str(user.email_address)])

            msg.html = f"<b>Hey {user.username}</b>, to reset password <a href='http://localhost:5173/reset-password/{user.id}'>Click here</a>."

            mail.send(msg)

            return jsonify({ "status": "success" }), 200
        except Exception as e:
            raise AppException(
                user_message="Could not send mail. Please try again.",
                internal_message=str(e),
                status_code=500
            )
        
    if request.method == "PATCH":
        try:
            new_password = request.form.get("password")
            id = request.form.get("id")
            change_password(id, new_password)

            return jsonify({"message": "Password change successful"}), 200
        except SQLAlchemyError as e:
            return AppException(
                user_message="Could not change password",
                internal_message=f"{str(e)}",
                status_code=500,
            )