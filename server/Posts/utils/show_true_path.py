import os

from flask import current_app


def show_true_path(filename: str) -> str:
    """
    Returns true path of a file during response

    Arguments
    ---------
    filename: path of file as stored in database
    """

    if filename is not None:
        return os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
