"""Make posts table self referential

Revision ID: 31a1e2ea098c
Revises: e04a67bba85e
Create Date: 2023-05-01 19:13:08.820624

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '31a1e2ea098c'
down_revision = 'e04a67bba85e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('parent_id', sa.UUID(), nullable=True))
        batch_op.create_foreign_key(None, 'posts', ['parent_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('parent_id')

    # ### end Alembic commands ###