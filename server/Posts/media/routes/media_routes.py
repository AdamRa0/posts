from flask import Blueprint, send_from_directory
from flask_jwt_extended import current_user, jwt_required


media_routes = Blueprint("media_routes", __name__, url_prefix="/api/v1/media")


@media_routes.get("/<path:filename>")
@jwt_required(optional=True)
def get_media(filename):
    if filename == "default_banner_img.jpg" or filename == "default_profile_img.jpg":
        return send_from_directory("../uploads", filename)
    
    if filename.split("_")[0] != current_user.id:
        return send_from_directory("../uploads", filename)

    return send_from_directory("../uploads", f"{current_user.id}_{filename}")
