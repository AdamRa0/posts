from flask import Blueprint, send_from_directory

media_routes = Blueprint("media_routes", __name__, url_prefix="/api/v1/media")


@media_routes.get("/<path:filename>")
def get_media(filename):
    return send_from_directory("../uploads", filename)
