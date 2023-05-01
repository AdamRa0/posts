"""Create primary composite key in subscribers junction table

Revision ID: fb4ab55cb1a3
Revises: da433662ffc3
Create Date: 2023-05-01 04:45:11.391194

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb4ab55cb1a3'
down_revision = 'da433662ffc3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('subscribers', schema=None) as batch_op:
        batch_op.alter_column('subscriber_id',
               existing_type=sa.UUID(),
               nullable=False)
        batch_op.alter_column('subscribee_id',
               existing_type=sa.UUID(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('subscribers', schema=None) as batch_op:
        batch_op.alter_column('subscribee_id',
               existing_type=sa.UUID(),
               nullable=True)
        batch_op.alter_column('subscriber_id',
               existing_type=sa.UUID(),
               nullable=True)

    # ### end Alembic commands ###
