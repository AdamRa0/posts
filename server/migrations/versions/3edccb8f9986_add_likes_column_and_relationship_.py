"""Add likes column and relationship; create user_likes junction table

Revision ID: 3edccb8f9986
Revises: c40c15082254
Create Date: 2024-08-16 17:13:46.730464

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3edccb8f9986'
down_revision = 'c40c15082254'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_likes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('post_id', sa.UUID(), nullable=False))
        batch_op.alter_column('user_id',
               existing_type=sa.UUID(),
               nullable=False)
        batch_op.create_foreign_key(None, 'posts', ['post_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_likes', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('user_id',
               existing_type=sa.UUID(),
               nullable=True)
        batch_op.drop_column('post_id')

    # ### end Alembic commands ###
