# Subsplit Backend

Multi-Platform AI Credit Marketplace Backend

## Features

- **Multi-Platform Support**: ChatGPT, Claude, Gemini integration
- **Virtual Cards**: Secure credit sharing without credential exposure
- **Credit Pooling**: Pool credits across multiple accounts
- **Dynamic Pricing**: AI-driven pricing based on demand
- **Session Management**: Isolated browser sessions for platform access
- **Real-time Monitoring**: Comprehensive metrics and observability

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Platforms  │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   (ChatGPT,     │
│                 │    │                 │    │    Claude,      │
└─────────────────┘    └─────────────────┘    │    Gemini)       │
                           │                   └─────────────────┘
                           │
                    ┌─────────────────┐
                    │   Database      │
                    │   (PostgreSQL)  │
                    └─────────────────┘
```

## Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL 12+
- Redis 6+
- Node.js 16+ (for frontend)

### Installation

1. **Clone and setup backend**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Setup environment**:
```bash
cp env.example .env
# Edit .env with your configuration
```

3. **Setup database**:
```bash
# Create PostgreSQL database
createdb subsplit

# Run migrations
alembic upgrade head
```

4. **Start services**:
```bash
# Start Redis
redis-server

# Start backend
uvicorn app.main:app --reload
```

5. **Start frontend**:
```bash
cd ..  # Back to project root
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user info

### Virtual Cards
- `POST /api/v1/virtual-cards/create` - Create virtual card
- `POST /api/v1/virtual-cards/validate` - Validate card
- `POST /api/v1/virtual-cards/{id}/charge` - Charge card
- `GET /api/v1/virtual-cards/{id}` - Get card details

### Marketplace
- `GET /api/v1/marketplace/listings` - Browse listings
- `POST /api/v1/marketplace/purchase` - Purchase credits
- `GET /api/v1/marketplace/my-purchases` - User purchases
- `GET /api/v1/marketplace/my-sales` - User sales

### Credit Pools
- `POST /api/v1/credit-pools/create` - Create pool
- `POST /api/v1/credit-pools/contribute` - Contribute to pool
- `POST /api/v1/credit-pools/session/create` - Create pool session
- `GET /api/v1/credit-pools/public` - Browse public pools

### Sessions
- `POST /api/v1/sessions/create` - Create platform session
- `POST /api/v1/sessions/{id}/request` - Execute request
- `DELETE /api/v1/sessions/{id}` - Terminate session

### Dynamic Pricing
- `GET /api/v1/pricing/demand/{platform}` - Get demand multiplier
- `GET /api/v1/pricing/trends/{platform}` - Get pricing trends
- `POST /api/v1/pricing/predict/{platform}` - Predict optimal pricing

## Configuration

Key configuration options in `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost/subsplit
REDIS_URL=redis://localhost:6379

# Platform APIs
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key

# Payment Processing
STRIPE_SECRET_KEY=your-stripe-key

# Security
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Development

### Project Structure

```
backend/
├── app/
│   ├── api/v1/endpoints/     # API endpoints
│   ├── core/                 # Core configuration
│   ├── models/              # Database models
│   ├── services/            # Business logic
│   └── main.py              # FastAPI app
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

### Adding New Platforms

1. Add platform to `PlatformType` enum in `models/platform_account.py`
2. Implement platform-specific logic in `services/platform_integration_service.py`
3. Add platform configuration in `core/config.py`
4. Update API endpoints as needed

### Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app
```

## Deployment

### Docker

```bash
# Build image
docker build -t subsplit-backend .

# Run container
docker run -p 8000:8000 subsplit-backend
```

### Production Checklist

- [ ] Set `DEBUG=false`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure production database
- [ ] Setup Redis cluster
- [ ] Configure monitoring (Sentry, Prometheus)
- [ ] Setup SSL/TLS
- [ ] Configure rate limiting
- [ ] Setup backup strategy

## Monitoring

- **Prometheus**: Metrics on port 8001
- **Structured Logging**: JSON logs with correlation IDs
- **Health Checks**: `/health` endpoint
- **Error Tracking**: Sentry integration

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation
- SQL injection prevention

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## License

MIT License - see LICENSE file for details
