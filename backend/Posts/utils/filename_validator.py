ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename: str):
    """
    Checks if file is under list of formats allowed for uploads

    Arguments
    ----------
    filename: Name of file to be uploaded
    """
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
