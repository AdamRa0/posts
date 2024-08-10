import os
from collections import defaultdict

from .filename_validator import allowed_file

from werkzeug.utils import secure_filename
from flask import current_app, request
from flask_jwt_extended import current_user


def upload_file() -> str | dict[str, str] | None:
    """
    Uploads file to server.
    Returns filename if file uploaded successfully.
    Returns None if file not uploaded.
    Currently only supports images and gifs
    """
    upload_folder: str = current_app.config["UPLOAD_FOLDER"]
    
    if "file" in request.files:
        file = request.files["file"]

        if "." not in file.filename or file.filename == "":
            return None

        if allowed_file(file.filename):
            filename = secure_filename(file.filename)
            new_filename = f"{current_user.id}_{filename}"
            file.save(os.path.join(upload_folder, new_filename))

            return filename
        
    else:
        map_: dict[str, str] = defaultdict(str)
        for k, v in request.files.items():
            if "." not in v.filename or v.filename == "":
                return None

            if allowed_file(v.filename):
                filename = secure_filename(v.filename)
                new_filename = f"{current_user.id}_{filename}"
                v.save(os.path.join(upload_folder, new_filename))

                if k == "profile_img":
                    map_["profile_image"] = filename
                if k == "banner_img":
                    map_["banner_img"] = filename

        return map_
