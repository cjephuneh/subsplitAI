#!/bin/bash

# Subsplit Start Script
# This script starts the complete Subsplit development environment

set -e

echo "🚀 Starting Subsplit - Multi-Platform AI Credit Marketplace"
echo "============================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    print_status "Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            print_success "$service_name is ready!"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name failed to start after $max_attempts attempts"
    return 1
}

# Start services with Docker Compose
start_with_docker() {
    print_status "Starting services with Docker Compose..."
    
    # Start infrastructure services
    docker-compose up -d postgres redis
    
    # Wait for services to be ready
    wait_for_service "http://localhost:5432" "PostgreSQL"
    wait_for_service "http://localhost:6379" "Redis"
    
    # Start backend
    print_status "Starting backend server..."
    cd backend
    source venv/bin/activate
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend
    wait_for_service "http://localhost:8000/health" "Backend API"
    
    # Start frontend
    print_status "Starting frontend server..."
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait for frontend
    wait_for_service "http://localhost:3000" "Frontend"
    
    print_success "All services started successfully!"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo "📊 Prometheus Metrics: http://localhost:8001"
    echo ""
    echo "Press Ctrl+C to stop all services"
    
    # Cleanup function
    cleanup() {
        print_status "Stopping services..."
        kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
        docker-compose down
        print_success "All services stopped"
        exit 0
    }
    
    # Set trap for cleanup
    trap cleanup INT TERM
    
    # Wait for processes
    wait
}

# Start services manually
start_manually() {
    print_status "Starting services manually..."
    
    # Check if ports are available
    if check_port 8000; then
        print_error "Port 8000 is already in use. Please stop the service using this port."
        exit 1
    fi
    
    if check_port 3000; then
        print_error "Port 3000 is already in use. Please stop the service using this port."
        exit 1
    fi
    
    # Start backend
    print_status "Starting backend server..."
    cd backend
    source venv/bin/activate
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend
    wait_for_service "http://localhost:8000/health" "Backend API"
    
    # Start frontend
    print_status "Starting frontend server..."
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait for frontend
    wait_for_service "http://localhost:3000" "Frontend"
    
    print_success "All services started successfully!"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo ""
    echo "Press Ctrl+C to stop all services"
    
    # Cleanup function
    cleanup() {
        print_status "Stopping services..."
        kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
        print_success "All services stopped"
        exit 0
    }
    
    # Set trap for cleanup
    trap cleanup INT TERM
    
    # Wait for processes
    wait
}

# Main function
main() {
    # Check if Docker is available
    if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
        start_with_docker
    else
        print_warning "Docker not available, starting services manually..."
        start_manually
    fi
}

# Run main function
main "$@"
