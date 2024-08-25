from ...app_exception import AppException
from ...database.db import jwt
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

from flask import Blueprint, jsonify, Response
from flask_pydantic import validate
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies,
    unset_access_cookies,
)
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


@auth_routes.route("/signout")
def signout_user():
    response: Response = jsonify({"status": "logged out successfully"})

    unset_access_cookies(response)

    return response, 200
