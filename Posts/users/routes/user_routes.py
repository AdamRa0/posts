from ..controllers.account_creation_and_use.create_user import create_new_user
from ..controllers.account_creation_and_use.get_user import get_user_by_handle, get_user_by_id, get_all_registered_users
from ..controllers.account_management.delete_user import del_user
from ..controllers.account_management.profile_customization import change_username, change_handle, change_email_address
from ..models.request_models.user_signin import UserIn
from ..models.response_models.user_schema import UserSchema

from flask import Blueprint, jsonify, request
from flask_pydantic import validate


user_routes = Blueprint('user_routes', __name__, url_prefix='/api/v1/users')
user_schema = UserSchema()
users_schemas = UserSchema(many=True)


@user_routes.route('/create_user', methods=['POST'])
@validate()
def create_user(body: UserIn):
    user = create_new_user(body)

    if user is None:
        return jsonify({
            'message': 'Failed to create new user. Try again',
            'status': 'fail'
        }), 400
    
    newly_created_user = get_user_by_handle(user.handle)

    return user_schema.dump(newly_created_user), 201


@user_routes.route('/<user_handle>')
def get_user_profile(user_handle: str):

    user = get_user_by_handle(user_handle)

    if user is None:
        return jsonify({
            'message': 'User not found',
            'status': 'fail'
        }), 404
    
    return user_schema.dump(user), 200


@user_routes.route('/user/<user_id>')
def get_user_profile_by_id(user_id: str):
    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            'message': 'User not found',
            'status': 'fail'
        }), 404
    
    return user_schema.dump(user), 200


@user_routes.route('/')
def get_all_users():
    users = get_all_registered_users()

    return users_schemas.dump(users), 200


@user_routes.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id: str):
    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            'message': 'User does not exist',
            'status': 'fail'
        }), 400

    del_user(user)
    
    return jsonify({}), 204


@user_routes.route('/profile/<user_id>', methods=['PATCH'])
def update_user_details(user_id: str):
    user = get_user_by_id(user_id)
    
    username = request.json.get('username')
    email_address = request.json.get('email_address')
    handle = request.json.get('handle')

    if username is not None: change_username(user, username)
    if email_address is not None: change_email_address(user, email_address)
    if handle is not None: change_handle(user, handle)

    updated_user = get_user_by_id(user_id)

    return user_schema.dump(updated_user), 200