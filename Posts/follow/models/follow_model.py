from .. .database.db import get_db
from sqlalchemy import Column, UUID, ForeignKey


db = get_db()


subscribers = db.Table(
    'subscribers',
    Column('subscriber_id', UUID, ForeignKey('users.id'), primary_key=True),
    Column('subscribee_id', UUID, ForeignKey('users.id'), primary_key=True)
)