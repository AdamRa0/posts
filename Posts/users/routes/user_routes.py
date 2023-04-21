from ..controllers.account_creation_and_use.create_user import create_new_user
from ..controllers.account_creation_and_use.get_user import get_user_by_handle, get_user_by_id
from ..controllers.account_management.delete_user import del_user
from ..models.request_models.user_signin import UserIn
from ..models.response_models.user_signin_response import UserOut

from flask import Blueprint, jsonify
from flask_pydantic import validate


user_routes = Blueprint('user_routes', __name__, url_prefix='/api/v1/users')


@user_routes.route('/create_user', methods=['POST'])
@validate()
def create_user(body: UserIn):
    user = create_new_user(body)

    if user is None:
        return jsonify({
            'message': 'Failed to create new user. Try again',
            'status': 'fail'
        }), 400
    
    newly_created_user = UserOut(
        username=user.username,
        email_address=user.email_address,
        handle=user.handle
    )

    return newly_created_user, 201


@user_routes.route('/<user_handle>')
@validate()
def get_user_profile(user_handle: str):

    user = get_user_by_handle(user_handle)

    if user is None:
        return jsonify({
            'message': 'User not found',
            'status': 'fail'
        }), 404
    
    account_user = UserOut(
        username=user.username,
        email_address=user.email_address,
        handle=user.handle
    )

    return account_user, 200


@user_routes.route('/user/<user_id>')
@validate()
def get_user_profile_by_id(user_id: str):
    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            'message': 'User not found',
            'status': 'fail'
        }), 404
    
    account_user = UserOut(
        username=user.username,
        email_address=user.email_address,
        handle=user.handle
    )

    return account_user, 200


@user_routes.route('/<user_id>', methods=['DELETE'])
@validate()
def delete_user(user_id: str):
    user = get_user_by_id(user_id)

    if user is None:
        return jsonify({
            'message': 'User does not exist',
            'status': 'fail'
        }), 400

    del_user(user)

    # Uncomment code when you create proper error handling functionality
    # deleted_user = get_user_by_id(user_id)

    # if deleted_user is not None:
    #     return jsonify({
    #         'message': 'Failed to delete user. Try again',
    #         'status': 'fail'
    #     }), 400
    
    return jsonify({}), 204