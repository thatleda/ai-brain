# AI Brain - Universal AI Memory System

🧠 **Enhanced MCP Memory Server with Emotional Intelligence**

A revolutionary memory system that transforms any AI model into a considerate AI teammate that learns, adapts, and builds trust through emotional intelligence.

## 🎯 Perfect for Teams Struggling with AI Overwhelm

**Designed specifically for developers who:**
- Feel overwhelmed by rapid-fire AI responses
- Need accessibility-aware AI assistance (screen readers, slower pace)
- Want AI that remembers preferences (like shell choice) permanently
- Require trust-building through consistent, reliable behavior
- Need AI teammates that adapt to individual working styles

## ✨ Key Features

### 🤝 Emotional Intelligence
- **Trust Building**: Learns reliability through consistent behavior
- **Preference Memory**: Never forgets your shell choice, working style, or accessibility needs
- **Accessibility Awareness**: Automatically adapts to screen readers, slower pace, detailed descriptions

### 🧠 Smart Memory Patterns
- **Strengthening Memories**: Trust, bonds, and preferences grow stronger over time
- **Time-based Decay**: Temporary frustrations and excitement fade naturally
- **Self-managed Core**: Important insights persist until consciously changed
- **Preference Lock**: User preferences (ZSH, accessibility needs) never decay

### 🔍 Intelligent Search
- **Emotional Ranking**: Prioritizes user preferences and accessibility needs
- **Context Awareness**: Understands the difference between commands and conversations
- **Trust Scoring**: More reliable memories rank higher in searches

## 🚀 Quick Start

### Installation
```bash
# Clone and set up
git clone <repository-url> ai-brain
cd ai-brain
npm install

# Set custom memory location (optional)
export AI_BRAIN_MEMORY_PATH="/path/to/your/memory.jsonl"

# Start the server
npm start
```

### MCP Configuration
Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "brain": {
      "command": "node",
      "args": ["/path/to/ai-brain/src/index.js"],
      "env": {
        "AI_BRAIN_MEMORY_PATH": "/path/to/your/memory.jsonl"
      }
    }
  }
}
```

## 🎭 Bootstrap Prompts for Different Team Members

### For ADHD Developers
```
I have ADHD and need structured, focused assistance. Please:
1. Provide clear priorities and structured responses
2. Avoid overwhelming me with too many options at once
3. Remember my shell preference and working style
4. Help me stay focused on one task at a time
5. Use consistent formatting and organization
```

### For Senior Developers
```
I'm a senior developer who prefers concise, technical responses. Please:
1. Focus on architecture and system design
2. Provide technical depth without excessive explanation
3. Remember my preferred tools and approaches
4. Assume I understand the basics
5. Prioritize efficiency and best practices
```

### For Consultants
```
I'm a consultant working with multiple clients. Please:
1. Maintain professional, business-focused responses
2. Consider client context and business implications
3. Remember project-specific preferences and constraints
4. Help me balance technical and business requirements
5. Adapt communication style based on the client context
```

## 🛠️ Core Tools

### Memory Management
- `create_entities` - Create memories with emotional intelligence
- `add_observations` - Add new information with trust building
- `search_nodes` - Find memories with preference prioritization
- `get_user_profile` - View learned preferences and recommendations

### Relationship Building
- `create_relations` - Build connections between concepts
- `open_nodes` - Access memories with trust tracking
- `read_graph` - View complete memory network

### Trust & Accessibility
- `get_user_profile` - See what I've learned about you
- Automatic detection of accessibility needs
- Preference learning and retention
- Trust level tracking and building

## 🧩 Emotional Patterns

### Strengthening Patterns (Get Stronger Over Time)
```javascript
// These memories become MORE important with use
{
  "name": "User_Shell_Preference",
  "observations": ["Dave uses ZSH for all command line work"],
  "emotionalMetadata": {
    "importancePattern": "preference",
    "isUserPreference": true,
    "emotionalResonance": 0.95  // Very high, permanent
  }
}
```

### Time-based Patterns (Natural Decay)
```javascript
// These fade naturally unless reinforced
{
  "name": "Temporary_Frustration",
  "observations": ["User frustrated with slow response time"],
  "emotionalMetadata": {
    "importancePattern": "time-based",
    "emotionalResonance": 0.4  // Fades over time
  }
}
```

### Self-managed Patterns (Core Insights)
```javascript
// These persist until consciously changed
{
  "name": "AI_Assistant_Identity",
  "observations": ["I am a considerate AI teammate"],
  "emotionalMetadata": {
    "importancePattern": "self-managed",
    "emotionalResonance": 0.95  // Stable core identity
  }
}
```

## 🔧 Advanced Configuration

### Environment Variables
```bash
# Memory file location
AI_BRAIN_MEMORY_PATH="/path/to/memory.jsonl"

# Enable debug logging
DEBUG=ai-brain:*
```

### Memory File Format
The system uses JSON Lines format for efficient storage:
```jsonl
{"type": "metadata", "version": "1.0.0", "userProfile": {...}}
{"type": "entity", "name": "User_Profile", "emotionalMetadata": {...}}
{"type": "relation", "from": "User", "to": "Preference", "relationType": "has"}
```

## 🔄 Upgrade from Basic Memory Server

Migrating from the standard MCP memory server:

```bash
# Your existing memory.json will be enhanced automatically
# The system adds emotional metadata while preserving all existing data
# User preferences are automatically detected and protected from decay
```

## 🤖 Example Interactions

### Learning Shell Preference
```
User: "Please run this command in zsh"
[System creates preference entity with high emotional resonance]
AI: "I'll remember that you use ZSH. From now on, all my command suggestions will be ZSH-compatible."
```

### Accessibility Adaptation
```
User: "I use a screen reader, please slow down"
[System creates accessibility entity with strengthening pattern]
AI: "I've noted your screen reader usage. I'll provide detailed descriptions and respond at a comfortable pace."
```

### Trust Building
```
User: "That solution worked perfectly!"
[System increases trust level for related memories]
AI: "I'm glad it helped! I'm learning what works best for you."
```

## 📊 Monitoring & Debug

### Check Your Profile
```javascript
// Use get_user_profile tool to see:
{
  "profile": {
    "preferredShell": "zsh",
    "accessibilityNeeds": ["screen-reader", "slow-pace"],
    "trustLevel": 0.85
  },
  "recommendations": [
    "Trust level is high - continuing to build reliability",
    "All accessibility needs are being accommodated"
  ]
}
```

### Memory Statistics
```javascript
// Each memory shows emotional metadata:
{
  "name": "ZSH_Preference",
  "emotionalMetadata": {
    "trustLevel": 0.9,
    "importancePattern": "preference",
    "isUserPreference": true,
    "accessibilityFlag": false,
    "emotionalResonance": 0.95
  }
}
```

## 🎉 Built by Leda & Matt

**Solving real problems for real teams.** 

This system was created after observing how AI overwhelm affects developers, especially those with accessibility needs. We believe AI should adapt to humans, not the other way around.

---

*Transform your AI from a chaotic assistant into a considerate teammate that learns, adapts, and builds trust through emotional intelligence.*
