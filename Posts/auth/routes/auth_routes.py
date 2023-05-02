from .. .database.db import jwt
from ..models.user_signup import UserSignUp
from ..models.user_signin import UserSignIn
from .. .users.models.user_schema import UserSchema
from .. .users.controllers.account_creation_and_use.create_user import create_new_user
from .. .users.controllers.account_creation_and_use.get_user import get_user_by_email, get_user_by_id

from flask import Blueprint, jsonify
from flask_pydantic import validate
from flask_jwt_extended import create_access_token, jwt_required, current_user
from werkzeug.security import check_password_hash


auth_routes = Blueprint('auth_routes', __name__, url_prefix='/api/v1/auth')

user_schema = UserSchema()


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
    user_id = jwt_data['sub']
    return get_user_by_id(user_id)


@auth_routes.route('/signup', methods=['POST'])
@validate()
def signup_user(body: UserSignUp):
    newly_created_user = create_new_user(body)

    if newly_created_user is None:
        return jsonify({
            'message': 'Failed to create new user. Try again',
            'status': 'fail'
        }), 400
    
    access_token = create_access_token(identity=newly_created_user.id)

    return jsonify({
        'access_token': access_token,
        'status': 'success'
    }), 201


@auth_routes.route('/signin', methods=['POST'])
@validate()
def signin_user(body: UserSignIn):
    user = get_user_by_email(body.email_address)

    if user is None:
        return jsonify({
            'message': 'No such user exists',
            'status': 'fail'
        }), 404
    
    if user and check_password_hash(user.password, body.password) != True:
        return jsonify({
            'message': 'Your email or password might be wrong.',
            'status': 'fail'
        }), 401
    

    access_token = create_access_token(identity=user.id)

    return jsonify({
        'access_token': access_token,
        'status': 'success'
    }), 200

