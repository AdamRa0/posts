import os
import click
from psycopg2 import connect
from psycopg2.extras import RealDictCursor
from flask import current_app, g, Flask

def _init_db():
    """
    Creates database connection, stores it in flask's g object for use by other modules/files.

    Returns created database connection.
    """
    db_name: str = current_app.config['DB_NAME']
    db_user: str = current_app.config['DB_USER']
    db_password: str = current_app.config['DB_PASSWORD']

    if 'db' not in g:
        g.db = connect(
            host='localhost',
            database=db_name, 
            user=db_user, 
            password=db_password, 
            cursor_factory=RealDictCursor
        )

    return g.db


def _close_db(e=None):
    """
    Closes database connection whenever not in use.
    """
    db = g.pop('db', None)

    if db is not None:
        db.close()

def create_tables():

    """
    Executes sql statements that create users and posts tables
    """

    db = _init_db()

    schema_directory_path = 'database/schemas'

    create_user_table_schema = os.path.join(schema_directory_path, 'users_schemas/create_users_table.sql')
    create_posts_table_schema = os.path.join(schema_directory_path, 'posts_schemas/create_posts_table.sql')

    with current_app.open_resource(create_user_table_schema) as f:
        db.cursor().execute(f.read())

    with current_app.open_resource(create_posts_table_schema) as f:
        db.cursor().execute(f.read())

    db.commit()

@click.command('create-tables')
def create_tables_command():
    create_tables()
    click.echo('Database tables created')

def init_db_tables(app: Flask):
    """
    Creates database tables when 'create-tables' command is called from terminal.
    Registers database connection for closure after every request
    """
    app.teardown_appcontext(_close_db)
    app.cli.add_command(create_tables_command)