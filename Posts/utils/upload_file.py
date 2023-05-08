import os

from .filename_validator import allowed_file

from werkzeug.utils import secure_filename
from flask import current_app, request


def upload_file() -> str | None:
    """
    Uploads file to server.
    Returns filename if file uploaded successfully.
    Returns None if file not uploaded.
    Currently only supports images and gifs
    """
    upload_folder: str = current_app.config["UPLOAD_FOLDER"]

    if "file" not in request.files:
        return None

    file = request.files["file"]

    if "." not in file.filename or file.filename == "":
        return None

    filename = secure_filename(file.filename)
    file.save(os.path.join(upload_folder, filename))

    return filename
