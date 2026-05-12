#!/bin/bash
set -e

echo "🚀 Setting up EU Lens for development..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js 20+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Setup environment
if [ ! -f .env ]; then
    echo "🔧 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Edit .env to add your OpenAI API key"
fi

echo ""
echo "✅ EU Lens setup complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Edit .env with your OpenAI API key (optional)"
echo "  2. Start frontend:  npm run dev"
echo "  3. Start backend:   npm run backend"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔌 Backend:  http://localhost:3001"
