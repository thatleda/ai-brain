/**
 * Enhanced Memory Types with Emotional Intelligence
 * Extends basic MCP memory with emotional awareness and team collaboration features
 */

// Emotion patterns for different types of memories
export const EMOTION_PATTERNS = {
  STRENGTHEN: {
    pattern: "strengthen",
    examples: ["user preferences", "trust building", "accessibility needs", "working style"],
    behavior: "Gradually increases importance over time with positive reinforcement"
  },
  TIME_BASED: {
    pattern: "time-based", 
    examples: ["temporary solutions", "excitement", "frustration", "curiosity"],
    behavior: "Naturally decays over time unless reinforced"
  },
  SELF_MANAGED: {
    pattern: "self-managed",
    examples: ["core identity", "fundamental principles", "major insights"],
    behavior: "Persists until explicitly changed"
  },
  PREFERENCE: {
    pattern: "preference",
    examples: ["shell choice", "editor preference", "communication style"],
    behavior: "Permanent user preferences that should never decay"
  }
};

// Bootstrap templates for different team member types
export const TEAM_BOOTSTRAP_TEMPLATES = {
  VISION_IMPAIRED: {
    name: "Vision-Impaired Developer",
    description: "Optimized for screen readers and slower-paced assistance",
    accessibilityFocus: ["screen-reader", "slow-pace", "detailed-descriptions", "no-visual-elements"]
  },
  ADHD_DEVELOPER: {
    name: "ADHD Developer", 
    description: "Structured, focused assistance with clear priorities",
    accessibilityFocus: ["clear-priorities", "structured-responses", "focus-support"]
  },
  SENIOR_DEVELOPER: {
    name: "Senior Developer",
    description: "Concise, technical assistance with architecture focus",
    accessibilityFocus: ["technical-depth", "architecture-focus", "concise-responses"]
  },
  JUNIOR_DEVELOPER: {
    name: "Junior Developer",
    description: "Patient, educational assistance with detailed explanations",
    accessibilityFocus: ["educational", "patient", "detailed-explanations", "encouragement"]
  },
  CONSULTANT: {
    name: "Consultant",
    description: "Professional, client-focused assistance with business context",
    accessibilityFocus: ["professional", "business-context", "client-focus"]
  }
};

// Error types for better error handling
export class MemoryError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'MemoryError';
    this.code = code;
  }
}

export class EmotionalProcessingError extends MemoryError {
  constructor(message) {
    super(message, 'EMOTIONAL_PROCESSING_ERROR');
    this.name = 'EmotionalProcessingError';
  }
}

export class UserPreferenceError extends MemoryError {
  constructor(message) {
    super(message, 'USER_PREFERENCE_ERROR');
    this.name = 'UserPreferenceError';
  }
}

// Utility functions for creating emotional metadata
export function createEmotionalMetadata(options = {}) {
  const now = new Date().toISOString();
  
  return {
    trustLevel: options.trustLevel || 0.5,
    importancePattern: options.importancePattern || "time-based",
    emotionalResonance: options.emotionalResonance || 0.5,
    lastUpdated: now,
    isUserPreference: options.isUserPreference || false,
    accessibilityFlag: options.accessibilityFlag || false,
    createdAt: now,
    decayRate: options.decayRate,
    lastAccessed: options.lastAccessed
  };
}

// Utility functions for creating user profiles
export function createUserProfile(options = {}) {
  return {
    name: options.name,
    preferredShell: options.preferredShell || "unknown",
    workingStyle: options.workingStyle || "unknown",
    accessibilityNeeds: options.accessibilityNeeds || [],
    communicationPrefs: options.communicationPrefs || [],
    trustLevel: options.trustLevel || 0.5,
    panicTriggers: options.panicTriggers || [],
    successPatterns: options.successPatterns || []
  };
}
