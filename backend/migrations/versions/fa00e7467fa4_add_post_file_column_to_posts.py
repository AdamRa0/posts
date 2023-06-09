"""Add post_file column to posts

Revision ID: fa00e7467fa4
Revises: 505db9daa0e2
Create Date: 2023-05-09 01:23:15.999936

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa00e7467fa4'
down_revision = '505db9daa0e2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('post_file', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_column('post_file')

    # ### end Alembic commands ###
