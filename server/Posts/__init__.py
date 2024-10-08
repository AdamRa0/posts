import os
import logging
from datetime import datetime, timezone, timedelta

from .users.routes.user_routes import user_routes
from .posts_.routes.post_routes import post_routes
from .media.routes.media_routes import media_routes
from .auth.routes.auth_routes import auth_routes
from .database.db import create_tables, init_app, mail
from .app_exception import AppException

from flask import Flask, jsonify
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    create_access_token,
    set_access_cookies,
)

COOKIE_MAX_AGE: int = 172800

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)


def handle_app_exception(error: AppException):
    print(error)
    response: dict[str, str] = {
        "error": "Error",
        "message": error.user_message,
    }

    logger.error(f"Internal error: {error.internal_message}")

    return jsonify(response), error.status_code


def create_app():
    """
    Creates and returns an instance of our application
    """

    app: Flask = Flask(
        __name__,
        instance_relative_config=(
            True
            if (
                os.environ.get("ENVIRONMENT") == "development"
                or os.environ.get("ENVIRONMENT") == "docker_dev"
            )
            else False
        ),
    )

    init_app(app)

    create_tables(app)

    app.register_blueprint(user_routes)
    app.register_blueprint(post_routes)
    app.register_blueprint(auth_routes)
    app.register_blueprint(media_routes)

    app.register_error_handler(
        AppException,
        handle_app_exception
    )


    @app.after_request
    def refresh_expiring_tokens(response):
        """
        Refreshes any token that is within 15 minutes of expiring
        """
        try:
            expiring_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestatmp = datetime.timestamp(now + timedelta(minutes=15))

            if target_timestatmp > expiring_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token, max_age=COOKIE_MAX_AGE)
            return response
        except (RuntimeError, KeyError):
            return response


    return app
