#!/bin/bash

# AI Brain Installation Script
# Sets up the Universal AI Memory System

echo "🧠 AI BRAIN INSTALLATION"
echo "Setting up Universal AI Memory System with Emotional Intelligence"
echo ""

# Check for language parameter
LANGUAGE="en"
if [[ "$1" == "--language" ]] || [[ "$1" == "-l" ]]; then
    if [[ -n "$2" ]]; then
        LANGUAGE="$2"
        echo "🌍 Setting language to: $LANGUAGE"
    else
        echo "❌ Language parameter requires a value (e.g., --language de)"
        exit 1
    fi
fi

echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. You have: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run tests
echo ""
echo "🧪 Running test suite..."
node test/test-memory.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 INSTALLATION COMPLETE!"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Add to your AI client MCP configuration:"
    echo ""
    echo '   {
     "mcpServers": {
       "ai-brain": {
         "command": "node",
         "args": ["'$(pwd)'/src/index.js"],
         "env": {
           "AI_BRAIN_MEMORY_PATH": "'$(pwd)'/memory.jsonl",
           "AI_BRAIN_LANGUAGE": "'$LANGUAGE'"
         }
       }
     }
   }'
    echo ""
    echo "2. Restart your AI client (Claude Desktop, etc.)"
    echo "3. Use bootstrap prompts from README.md"
    echo "4. Watch any AI model learn and adapt with persistent memory!"
    echo ""
    echo "📖 For detailed instructions, see README.md"
    echo "🎯 Works with Claude, DeepSeek, GPT, Llama, and more!"
    echo ""
    echo "🌍 Language Support:"
    echo "   English (default): ./install.sh"
    echo "   German: ./install.sh --language de"
    echo "   The AI will respond in the configured language"
else
    echo "❌ Tests failed. Please check the installation."
    exit 1
fi
