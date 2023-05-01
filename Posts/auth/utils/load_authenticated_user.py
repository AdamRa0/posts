"""
Automatically loads user to a protected route if user posseses a valid JWT
"""
# from .. ..Posts import jwt
# from .. .users.controllers.account_creation_and_use.get_user import get_user_by_id


# @jwt.user_identity_loader
# def user_identity_lookup(user_id: str):
#     """
#     Takes in user_id passed as identity in jwt.
#     Returns user_id as JSON
#     """
#     return user_id


# @jwt.user_lookup_loader
# def user_lookup_callback(_jwt_header, jwt_data):
#     """
#     Loads user from db whenever a protected route is accessed
#     """
#     user_id = jwt_data['sub']
#     return get_user_by_id(user_id)