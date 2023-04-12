import os
from flask import Flask

def create_app():
    app: Flask = Flask(__name__, instance_relative_config=True)
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def test_path():
        return 'Hello from flask'
    
    @app.route('/response')
    def test_response_path():
        return 'Some response'

    return app