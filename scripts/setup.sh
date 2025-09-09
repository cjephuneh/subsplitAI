#!/bin/bash

# Subsplit Setup Script
# This script sets up the complete Subsplit development environment

set -e

echo "🚀 Setting up Subsplit - Multi-Platform AI Credit Marketplace"
echo "=============================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if Python is installed
check_python() {
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.8+ first."
        exit 1
    fi
    
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
    print_success "Python $PYTHON_VERSION is installed"
}

# Setup backend environment
setup_backend() {
    print_status "Setting up backend environment..."
    
    cd backend
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Install Playwright browsers
    print_status "Installing Playwright browsers..."
    playwright install chromium
    
    # Setup environment file
    if [ ! -f ".env" ]; then
        print_status "Creating environment configuration..."
        cp env.example .env
        print_warning "Please edit backend/.env with your configuration"
    fi
    
    cd ..
    print_success "Backend environment setup complete"
}

# Setup frontend environment
setup_frontend() {
    print_status "Setting up frontend environment..."
    
    # Install dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    
    # Setup environment file
    if [ ! -f ".env.local" ]; then
        print_status "Creating frontend environment configuration..."
        echo "VITE_API_URL=http://localhost:8000/api/v1" > .env.local
    fi
    
    print_success "Frontend environment setup complete"
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    # Check if PostgreSQL is running
    if ! pg_isready -h localhost -p 5432 &> /dev/null; then
        print_warning "PostgreSQL is not running. Starting with Docker..."
        docker-compose up -d postgres redis
        sleep 10
    fi
    
    # Run migrations
    cd backend
    source venv/bin/activate
    
    print_status "Running database migrations..."
    alembic upgrade head
    
    cd ..
    print_success "Database setup complete"
}

# Start services
start_services() {
    print_status "Starting Subsplit services..."
    
    # Start backend
    print_status "Starting backend server..."
    cd backend
    source venv/bin/activate
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    sleep 5
    
    # Start frontend
    print_status "Starting frontend server..."
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait for services to start
    sleep 5
    
    print_success "Services started successfully!"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo ""
    echo "Press Ctrl+C to stop all services"
    
    # Wait for user interrupt
    trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
    wait
}

# Main setup function
main() {
    echo ""
    print_status "Checking system requirements..."
    check_docker
    check_node
    check_python
    
    echo ""
    print_status "Setting up development environment..."
    setup_backend
    setup_frontend
    
    echo ""
    print_status "Setting up database..."
    setup_database
    
    echo ""
    print_success "Setup complete! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Edit backend/.env with your API keys"
    echo "2. Run './scripts/start.sh' to start the services"
    echo "3. Visit http://localhost:3000 to access the application"
    echo ""
}

# Run main function
main "$@"
