"""Add profile_image column to users table

Revision ID: 505db9daa0e2
Revises: 46771d436ed7
Create Date: 2023-05-09 00:10:37.945174

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '505db9daa0e2'
down_revision = '46771d436ed7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_image', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('profile_image')

    # ### end Alembic commands ###