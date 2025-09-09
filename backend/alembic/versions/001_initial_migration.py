"""Initial migration for Subsplit database

Revision ID: 001
Revises: 
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create users table
    op.create_table('users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('username', sa.String(length=50), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('first_name', sa.String(length=100), nullable=True),
        sa.Column('last_name', sa.String(length=100), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('is_verified', sa.Boolean(), nullable=True),
        sa.Column('is_premium', sa.Boolean(), nullable=True),
        sa.Column('balance', sa.Float(), nullable=True),
        sa.Column('total_earned', sa.Float(), nullable=True),
        sa.Column('total_spent', sa.Float(), nullable=True),
        sa.Column('failed_login_attempts', sa.Integer(), nullable=True),
        sa.Column('locked_until', sa.DateTime(), nullable=True),
        sa.Column('last_login', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)

    # Create platform_accounts table
    op.create_table('platform_accounts',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('platform', sa.Enum('CHATGPT', 'CLAUDE', 'GEMINI', 'MIDJOURNEY', 'CANVA', name='platformtype'), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('encrypted_credentials', sa.String(length=1000), nullable=True),
        sa.Column('api_key', sa.String(length=500), nullable=True),
        sa.Column('status', sa.Enum('ACTIVE', 'INACTIVE', 'SUSPENDED', 'VERIFICATION_PENDING', name='accountstatus'), nullable=True),
        sa.Column('is_premium', sa.Boolean(), nullable=True),
        sa.Column('subscription_type', sa.String(length=50), nullable=True),
        sa.Column('available_credits', sa.Float(), nullable=True),
        sa.Column('total_credits', sa.Float(), nullable=True),
        sa.Column('credits_used', sa.Float(), nullable=True),
        sa.Column('last_credit_sync', sa.DateTime(), nullable=True),
        sa.Column('allow_pooling', sa.Boolean(), nullable=True),
        sa.Column('min_pool_amount', sa.Float(), nullable=True),
        sa.Column('max_pool_amount', sa.Float(), nullable=True),
        sa.Column('verification_token', sa.String(length=100), nullable=True),
        sa.Column('verified_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create virtual_cards table
    op.create_table('virtual_cards',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('card_number', sa.String(length=16), nullable=False),
        sa.Column('cvv', sa.String(length=3), nullable=False),
        sa.Column('expiry_date', sa.DateTime(), nullable=False),
        sa.Column('seller_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('buyer_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('platform_account_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('initial_balance', sa.Float(), nullable=False),
        sa.Column('current_balance', sa.Float(), nullable=False),
        sa.Column('price_per_hour', sa.Float(), nullable=False),
        sa.Column('total_charged', sa.Float(), nullable=True),
        sa.Column('status', sa.Enum('ACTIVE', 'EXPIRED', 'DEPLETED', 'SUSPENDED', 'CANCELLED', name='cardstatus'), nullable=True),
        sa.Column('usage_count', sa.Integer(), nullable=True),
        sa.Column('last_used', sa.DateTime(), nullable=True),
        sa.Column('base_price', sa.Float(), nullable=False),
        sa.Column('current_price', sa.Float(), nullable=False),
        sa.Column('demand_multiplier', sa.Float(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('activated_at', sa.DateTime(), nullable=True),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['buyer_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['platform_account_id'], ['platform_accounts.id'], ),
        sa.ForeignKeyConstraint(['seller_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_virtual_cards_card_number'), 'virtual_cards', ['card_number'], unique=True)

    # Create sessions table
    op.create_table('sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('buyer_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('virtual_card_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('platform_account_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('session_token', sa.String(length=100), nullable=False),
        sa.Column('browser_session_id', sa.String(length=100), nullable=True),
        sa.Column('session_data', sa.JSON(), nullable=True),
        sa.Column('total_usage', sa.Float(), nullable=True),
        sa.Column('request_count', sa.Integer(), nullable=True),
        sa.Column('last_request_at', sa.DateTime(), nullable=True),
        sa.Column('status', sa.Enum('ACTIVE', 'EXPIRED', 'TERMINATED', 'SUSPENDED', name='sessionstatus'), nullable=True),
        sa.Column('started_at', sa.DateTime(), nullable=True),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.Column('terminated_at', sa.DateTime(), nullable=True),
        sa.Column('platform_session_id', sa.String(length=100), nullable=True),
        sa.Column('platform_user_agent', sa.String(length=500), nullable=True),
        sa.Column('platform_cookies', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['buyer_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['platform_account_id'], ['platform_accounts.id'], ),
        sa.ForeignKeyConstraint(['virtual_card_id'], ['virtual_cards.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_sessions_session_token'), 'sessions', ['session_token'], unique=True)

    # Create transactions table
    op.create_table('transactions',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('buyer_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('seller_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('virtual_card_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('transaction_type', sa.Enum('CREDIT_PURCHASE', 'CREDIT_SALE', 'PLATFORM_FEE', 'REFUND', 'WITHDRAWAL', 'DEPOSIT', name='transactiontype'), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('platform_fee', sa.Float(), nullable=True),
        sa.Column('net_amount', sa.Float(), nullable=False),
        sa.Column('payment_method', sa.String(length=50), nullable=True),
        sa.Column('payment_intent_id', sa.String(length=100), nullable=True),
        sa.Column('payment_status', sa.String(length=50), nullable=True),
        sa.Column('status', sa.Enum('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', name='transactionstatus'), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('metadata', sa.String(length=1000), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('completed_at', sa.DateTime(), nullable=True),
        sa.Column('failed_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['buyer_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['seller_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['virtual_card_id'], ['virtual_cards.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create credit_pools table
    op.create_table('credit_pools',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('owner_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('platform', sa.String(length=50), nullable=False),
        sa.Column('pool_name', sa.String(length=100), nullable=False),
        sa.Column('min_contribution', sa.Float(), nullable=True),
        sa.Column('max_contribution', sa.Float(), nullable=True),
        sa.Column('auto_refill_threshold', sa.Float(), nullable=True),
        sa.Column('auto_refill_amount', sa.Float(), nullable=True),
        sa.Column('status', sa.Enum('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DEPLETED', name='poolstatus'), nullable=True),
        sa.Column('is_public', sa.Boolean(), nullable=True),
        sa.Column('allow_external_contributors', sa.Boolean(), nullable=True),
        sa.Column('total_contributed', sa.Float(), nullable=True),
        sa.Column('total_used', sa.Float(), nullable=True),
        sa.Column('current_balance', sa.Float(), nullable=True),
        sa.Column('available_balance', sa.Float(), nullable=True),
        sa.Column('total_sessions', sa.Integer(), nullable=True),
        sa.Column('active_sessions', sa.Integer(), nullable=True),
        sa.Column('last_used_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create credit_pool_contributions table
    op.create_table('credit_pool_contributions',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('credit_pool_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('platform_account_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('contributor_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('contribution_type', sa.String(length=50), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('withdrawn_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['contributor_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['credit_pool_id'], ['credit_pools.id'], ),
        sa.ForeignKeyConstraint(['platform_account_id'], ['platform_accounts.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create pool_sessions table
    op.create_table('pool_sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('credit_pool_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('session_token', sa.String(length=100), nullable=False),
        sa.Column('allocated_amount', sa.Float(), nullable=False),
        sa.Column('used_amount', sa.Float(), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.Column('completed_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['credit_pool_id'], ['credit_pools.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_pool_sessions_session_token'), 'pool_sessions', ['session_token'], unique=True)

    # Create usage_logs table
    op.create_table('usage_logs',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('session_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('virtual_card_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('request_type', sa.String(length=50), nullable=False),
        sa.Column('platform', sa.String(length=50), nullable=False),
        sa.Column('request_data', sa.JSON(), nullable=True),
        sa.Column('response_data', sa.JSON(), nullable=True),
        sa.Column('request_size', sa.Integer(), nullable=True),
        sa.Column('response_size', sa.Integer(), nullable=True),
        sa.Column('base_cost', sa.Float(), nullable=False),
        sa.Column('actual_cost', sa.Float(), nullable=False),
        sa.Column('cost_multiplier', sa.Float(), nullable=True),
        sa.Column('response_time_ms', sa.Integer(), nullable=True),
        sa.Column('success', sa.String(length=10), nullable=True),
        sa.Column('error_message', sa.Text(), nullable=True),
        sa.Column('user_agent', sa.String(length=500), nullable=True),
        sa.Column('ip_address', sa.String(length=45), nullable=True),
        sa.Column('session_data', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['session_id'], ['sessions.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['virtual_card_id'], ['virtual_cards.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_table('usage_logs')
    op.drop_index(op.f('ix_pool_sessions_session_token'), table_name='pool_sessions')
    op.drop_table('pool_sessions')
    op.drop_table('credit_pool_contributions')
    op.drop_table('credit_pools')
    op.drop_table('transactions')
    op.drop_index(op.f('ix_sessions_session_token'), table_name='sessions')
    op.drop_table('sessions')
    op.drop_index(op.f('ix_virtual_cards_card_number'), table_name='virtual_cards')
    op.drop_table('virtual_cards')
    op.drop_table('platform_accounts')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
