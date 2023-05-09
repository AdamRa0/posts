"""Add banner_image column to users table

Revision ID: be66a64c211c
Revises: fa00e7467fa4
Create Date: 2023-05-09 22:55:53.857753

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be66a64c211c'
down_revision = 'fa00e7467fa4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('banner_image', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('banner_image')

    # ### end Alembic commands ###
