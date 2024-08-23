from werkzeug.exceptions import HTTPException


class AppException(HTTPException):
    def __init__(
        self, user_message: str, internal_message: str, status_code: int = 400
    ):
        self.user_message = user_message
        self.internal_message = internal_message or user_message
        self.status_code = status_code
        super().__init__(description=user_message, response=None)