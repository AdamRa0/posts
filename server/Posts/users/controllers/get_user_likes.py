from ..controllers.account_creation_and_use.get_user import get_user_by_id

def get_user_approvals(user_id: str):
    """
    Gets a user's likes/approvals

    Arguments
    ---------
    user_id: str - User's id

    Returns a users likes
    """

    user = get_user_by_id(user_id);
    return user.likes