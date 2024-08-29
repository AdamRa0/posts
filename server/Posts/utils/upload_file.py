import os
from collections import defaultdict
from datetime import datetime

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
            new_filename = f"{datetime.today().strftime('%Y-%m-%d_%H:%M:%S')}_{current_user.id}_{filename}"
            file.save(os.path.join(upload_folder, new_filename))

            return new_filename
        
    else:
        map_: dict[str, str] = defaultdict(str)
        for k, v in request.files.items():
            if "." not in v.filename or v.filename == "":
                return None

            if allowed_file(v.filename):
                filename = secure_filename(v.filename)
                new_filename = f"{datetime.today().strftime('%Y-%m-%d_%H:%M:%S')}_{current_user.id}_{filename}"
                v.save(os.path.join(upload_folder, new_filename))

                if k == "profile_img":
                    map_["profile_image"] = new_filename
                if k == "banner_img":
                    map_["banner_img"] = new_filename

        return map_
