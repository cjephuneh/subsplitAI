# Subsplit - Multi-Platform AI Credit Marketplace

A revolutionary platform that enables users to buy, sell, and pool AI credits across multiple platforms including ChatGPT, Claude, and Gemini. Built for African engineers and developers who need affordable access to AI tools.

## 🌟 Features

### Core Functionality
- **Multi-Platform Support**: Seamlessly integrate with ChatGPT, Claude, and Gemini
- **Virtual Cards**: Secure credit sharing without exposing credentials
- **Credit Pooling**: Pool credits across multiple accounts for better utilization
- **Dynamic Pricing**: AI-driven pricing based on real-time demand
- **Session Management**: Isolated browser sessions for secure platform access

### Advanced Features
- **Real-time Monitoring**: Comprehensive metrics and observability
- **Fraud Prevention**: Advanced security measures and usage tracking
- **Mobile Responsive**: Beautiful UI that works on all devices
- **API-First Design**: Complete REST API for third-party integrations

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Platforms  │
│   (React + TS)  │◄──►│   (FastAPI)     │◄──►│   (ChatGPT,     │
│                 │    │                 │    │    Claude,      │
└─────────────────┘    └─────────────────┘    │    Gemini)       │
                           │                   └─────────────────┘
                           │
                    ┌─────────────────┐
                    │   Database      │
                    │   (PostgreSQL)  │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- PostgreSQL 12+
- Redis 6+
- Docker & Docker Compose (optional)

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/subsplit-ai-share.git
cd subsplit-ai-share

# Run the setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# Start all services
./scripts/start.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Setup environment
cp env.example .env
# Edit .env with your configuration

# Setup database
createdb subsplit
alembic upgrade head

# Start backend
uvicorn app.main:app --reload
```

#### Frontend Setup
```bash
# Install dependencies
npm install

# Setup environment
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env.local

# Start frontend
npm run dev
```

### Option 3: Docker Setup

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## 📱 Access Points

After starting the services:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Prometheus Metrics**: http://localhost:8001

## 🔧 Configuration

### Backend Configuration (`backend/.env`)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost/subsplit
REDIS_URL=redis://localhost:6379

# External APIs
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
GOOGLE_API_KEY=your-google-api-key

# Payment Processing
STRIPE_SECRET_KEY=your-stripe-secret-key

# Security
SECRET_KEY=your-super-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend Configuration (`.env.local`)

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## 📚 API Documentation

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

## 🎯 How It Works

### 1. Virtual Card System
```
User A (Seller) → Lists ChatGPT Credits → Virtual Card Generated → User B (Buyer) → Uses Virtual Card → Accesses ChatGPT
```

### 2. Credit Pooling
```
Multiple Users → Contribute Credits → Pool Created → Shared Access → Better Utilization
```

### 3. Dynamic Pricing
```
Demand Analysis → Price Calculation → Real-time Updates → Optimal Revenue
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **CORS Protection**: Secure cross-origin requests
- **Input Validation**: Comprehensive data validation
- **SQL Injection Prevention**: Parameterized queries
- **Session Isolation**: Isolated browser contexts

## 📊 Monitoring & Analytics

- **Prometheus Metrics**: Real-time system metrics
- **Structured Logging**: JSON logs with correlation IDs
- **Health Checks**: Comprehensive health monitoring
- **Error Tracking**: Sentry integration for error monitoring
- **Performance Metrics**: Request duration and throughput tracking

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
npm test

# End-to-end tests
npm run test:e2e
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `DEBUG=false`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure production database
- [ ] Setup Redis cluster
- [ ] Configure monitoring (Sentry, Prometheus)
- [ ] Setup SSL/TLS
- [ ] Configure rate limiting
- [ ] Setup backup strategy

### Docker Production
```bash
# Build production images
docker build -t subsplit-backend ./backend
docker build -t subsplit-frontend .

# Deploy with production compose
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript for frontend code
- Write tests for new features
- Update documentation
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the African developer community
- Inspired by the need for affordable AI access
- Thanks to all contributors and early adopters

## 📞 Support

- **Documentation**: [docs.subsplit.com](https://docs.subsplit.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/subsplit-ai-share/issues)
- **Discord**: [Join our community](https://discord.gg/subsplit)
- **Email**: support@subsplit.com

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Core virtual card system
- [x] Multi-platform integration
- [x] Basic marketplace
- [x] Credit pooling

### Phase 2 (Q2 2024)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] API for third-party developers
- [ ] Automated credit management

### Phase 3 (Q3 2024)
- [ ] Machine learning pricing optimization
- [ ] Cross-platform credit transfers
- [ ] Enterprise features
- [ ] Global expansion

---

**Made with ❤️ for the African developer community**