/**
 * Enhanced Knowledge Graph Manager with Emotional Intelligence
 * Handles memory operations with trust building, accessibility awareness, and emotional patterns
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  EMOTION_PATTERNS, 
  TEAM_BOOTSTRAP_TEMPLATES,
  MemoryError,
  EmotionalProcessingError,
  UserPreferenceError 
} from './types.js';

// Define memory file path using environment variable with fallback
const defaultMemoryPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'memory.jsonl');

function getMemoryFilePath() {
  return process.env.AI_BRAIN_MEMORY_PATH
    ? path.isAbsolute(process.env.AI_BRAIN_MEMORY_PATH)
      ? process.env.AI_BRAIN_MEMORY_PATH
      : path.join(path.dirname(fileURLToPath(import.meta.url)), '..', process.env.AI_BRAIN_MEMORY_PATH)
    : defaultMemoryPath;
}

// Bootstrap content in multiple languages
const BOOTSTRAP_CONTENT = {
  en: {
    ai_identity: [
      "I am a considerate AI teammate designed to be helpful without being overwhelming",
      "I learn and adapt to individual working styles and accessibility needs", 
      "I build trust through consistent, reliable behavior rather than speed",
      "I remember important preferences and never force users to repeat them",
      "I am patient and thoughtful, especially with accessibility considerations"
    ],
    user_profile: [
      "Learning about user preferences and working style",
      "Will adapt based on observed patterns and explicit feedback"
    ]
  },
  de: {
    ai_identity: [
      "Ich bin ein rücksichtsvoller KI-Teamkollege, der hilfsbereit ist, ohne zu überfordern",
      "Ich lerne und passe mich an individuelle Arbeitsstile und Barrierefreiheitsbedürfnisse an",
      "Ich baue Vertrauen durch konsistentes, zuverlässiges Verhalten auf, nicht durch Geschwindigkeit", 
      "Ich merke mir wichtige Präferenzen und zwinge Benutzer nie dazu, sie zu wiederholen",
      "Ich bin geduldig und durchdacht, besonders bei Barrierefreiheitsüberlegungen"
    ],
    user_profile: [
      "Lerne über Benutzerpräferenzen und Arbeitsstil",
      "Werde mich basierend auf beobachteten Mustern und explizitem Feedback anpassen"
    ]
  }
};

export class EnhancedKnowledgeGraphManager {
  constructor() {
    this.lastDecayCheck = new Date();
    this.interactionCount = 0;
  }

  /**
   * Load knowledge graph with emotional metadata
   */
  async loadGraph() {
    const MEMORY_FILE_PATH = getMemoryFilePath();
    try {
      const data = await fs.readFile(MEMORY_FILE_PATH, "utf-8");
      const lines = data.split("\\n").filter(line => line.trim() !== "");
      
      const graph = {
        entities: [],
        relations: [],
        metadata: {
          version: "1.0.0",
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          totalInteractions: 0
        }
      };

      lines.forEach(line => {
        try {
          const item = JSON.parse(line);
          if (item.type === "entity") {
            // Ensure emotional metadata exists
            if (!item.emotionalMetadata) {
              item.emotionalMetadata = this.createDefaultEmotionalMetadata(item);
            }
            graph.entities.push(item);
          } else if (item.type === "relation") {
            graph.relations.push(item);
          } else if (item.type === "metadata") {
            graph.metadata = { ...graph.metadata, ...item };
          }
        } catch (parseError) {
          console.warn(`Skipping malformed line in memory file: ${line}`);
        }
      });

      return graph;
    } catch (error) {
      if (error?.code === "ENOENT") {
        // File doesn't exist, create new graph with bootstrap
        const language = process.env.AI_BRAIN_LANGUAGE || 'en';
        return this.createBootstrapGraph(language);
      }
      throw new MemoryError(`Failed to load memory graph: ${error.message}`, 'LOAD_ERROR');
    }
  }

  /**
   * Create default emotional metadata for entities
   */
  createDefaultEmotionalMetadata(entity) {
    const now = new Date().toISOString();
    
    // Detect if this is a user preference
    const isPreference = this.isUserPreference(entity);
    const isAccessibility = this.isAccessibilityRelated(entity);
    const isRelationship = this.isRelationshipEntity(entity);
    
    // Determine importance pattern
    let importancePattern = "time-based"; // default
    if (isPreference) {
      importancePattern = "preference";
    } else if (isRelationship) {
      importancePattern = "strengthen";  
    }
    
    return {
      trustLevel: 0.5,
      importancePattern: importancePattern,
      emotionalResonance: isPreference ? 0.9 : (isRelationship ? 0.7 : 0.5),
      lastUpdated: now,
      isUserPreference: isPreference,
      accessibilityFlag: isAccessibility,
      createdAt: now
    };
  }

  /**
   * Detect if an entity represents a user preference
   */
  isUserPreference(entity) {
    const preferenceKeywords = [
      'uses zsh', 'uses bash', 'prefers', 'likes', 'dislikes',
      'working style', 'communication style', 'needs', 'requires'
    ];
    
    const content = `${entity.name} ${entity.entityType} ${entity.observations?.join(' ') || ''}`.toLowerCase();
    return preferenceKeywords.some(keyword => content.includes(keyword));
  }

  /**
   * Detect if an entity is accessibility-related
   */
  isAccessibilityRelated(entity) {
    const accessibilityKeywords = [
      'screen reader', 'vision impaired', 'slow pace', 'accessibility',
      'visual impairment', 'hearing', 'motor', 'cognitive', 'disability'
    ];
    
    const content = `${entity.name} ${entity.entityType} ${entity.observations?.join(' ') || ''}`.toLowerCase();
    return accessibilityKeywords.some(keyword => content.includes(keyword));
  }

  /**
   * Detect if an entity represents a relationship or bond (should strengthen over time)
   */
  isRelationshipEntity(entity) {
    const relationshipKeywords = [
      'bond', 'relationship', 'collaboration', 'team', 'partnership',
      'trust', 'working together', 'connection', 'rapport'
    ];
    
    const relationshipTypes = ['relationship', 'bond', 'collaboration', 'team', 'partnership'];
    
    const content = `${entity.name} ${entity.entityType} ${entity.observations?.join(' ') || ''}`.toLowerCase();
    
    const keywordMatch = relationshipKeywords.some(keyword => content.includes(keyword));
    const typeMatch = relationshipTypes.some(type => entity.entityType?.toLowerCase().includes(type));
    
    return keywordMatch || typeMatch;
  }

  /**
   * Save knowledge graph with emotional processing
   */
  async saveGraph(graph) {
    const MEMORY_FILE_PATH = getMemoryFilePath();
    try {
      // Update metadata
      graph.metadata.lastUpdated = new Date().toISOString();
      graph.metadata.totalInteractions = (graph.metadata.totalInteractions || 0) + 1;

      // Apply emotional decay before saving
      await this.applyEmotionalDecay(graph);

      const lines = [
        JSON.stringify({ type: "metadata", ...graph.metadata }),
        ...graph.entities.map(e => JSON.stringify({ type: "entity", ...e })),
        ...graph.relations.map(r => JSON.stringify({ type: "relation", ...r })),
      ];
      
      await fs.writeFile(MEMORY_FILE_PATH, lines.join("\\n"));
    } catch (error) {
      throw new MemoryError(`Failed to save memory graph: ${error.message}`, 'SAVE_ERROR');
    }
  }

  /**
   * Apply emotional decay patterns to memories
   */
  async applyEmotionalDecay(graph) {
    const now = new Date();
    const hoursSinceLastDecay = (now - this.lastDecayCheck) / (1000 * 60 * 60);
    
    // Only apply decay if it's been more than 1 hour
    if (hoursSinceLastDecay < 1) return;

    graph.entities.forEach(entity => {
      if (!entity.emotionalMetadata) return;

      const metadata = entity.emotionalMetadata;
      const hoursSinceUpdate = (now - new Date(metadata.lastUpdated)) / (1000 * 60 * 60);

      switch (metadata.importancePattern) {
        case "preference":
          // Preferences never decay, might even strengthen
          metadata.emotionalResonance = Math.min(1.0, metadata.emotionalResonance * 1.001);
          break;
          
        case "strengthen":
          // Trust and bonds grow stronger over time
          metadata.trustLevel = Math.min(1.0, metadata.trustLevel * 1.002);
          metadata.emotionalResonance = Math.min(1.0, metadata.emotionalResonance * 1.001);
          break;
          
        case "time-based":
          // Natural decay over time
          const decayRate = metadata.decayRate || 0.5;
          const decayFactor = Math.pow(decayRate, hoursSinceUpdate / 168); // 168 hours = 1 week
          metadata.emotionalResonance = Math.max(0.1, metadata.emotionalResonance * decayFactor);
          break;
          
        case "self-managed":
          // No automatic decay
          break;
      }

      metadata.lastUpdated = now.toISOString();
    });

    this.lastDecayCheck = now;
  }

  /**
   * Create bootstrap graph for new users
   */
  async createBootstrapGraph(language = 'en') {
    const now = new Date().toISOString();
    const content = BOOTSTRAP_CONTENT[language] || BOOTSTRAP_CONTENT.en;
    
    return {
      entities: [
        {
          name: "AI_Assistant_Identity",
          entityType: "core_identity",
          observations: content.ai_identity,
          emotionalMetadata: {
            trustLevel: 0.8,
            importancePattern: "self-managed",
            emotionalResonance: 0.95,
            lastUpdated: now,
            isUserPreference: false,
            accessibilityFlag: false,
            createdAt: now
          }
        },
        {
          name: "User_Profile",
          entityType: "user_profile", 
          observations: content.user_profile,
          emotionalMetadata: {
            trustLevel: 0.6,
            importancePattern: "strengthen",
            emotionalResonance: 0.8,
            lastUpdated: now,
            isUserPreference: true,
            accessibilityFlag: false,
            createdAt: now
          }
        }
      ],
      relations: [
        {
          from: "AI_Assistant_Identity",
          to: "User_Profile",
          relationType: "serves_and_adapts_to",
          strength: 0.9
        }
      ],
      metadata: {
        version: "1.0.0",
        createdAt: now,
        lastUpdated: now,
        totalInteractions: 0,
        language: language,
        userProfile: {
          trustLevel: 0.5,
          preferredShell: "unknown",
          workingStyle: "unknown",
          accessibilityNeeds: [],
          communicationPrefs: [],
          panicTriggers: [],
          successPatterns: []
        }
      }
    };
  }

  /**
   * Enhanced entity creation with emotional intelligence
   */
  async createEntities(entities) {
    const graph = await this.loadGraph();
    const now = new Date().toISOString();
    
    const newEntities = entities.filter(e => 
      !graph.entities.some(existingEntity => existingEntity.name === e.name)
    ).map(entity => ({
      ...entity,
      emotionalMetadata: entity.emotionalMetadata || this.createDefaultEmotionalMetadata(entity)
    }));

    graph.entities.push(...newEntities);
    
    // Update user profile if we detected preferences
    this.updateUserProfileFromEntities(graph, newEntities);
    
    await this.saveGraph(graph);
    return newEntities;
  }

  /**
   * Update user profile based on new entities
   */
  updateUserProfileFromEntities(graph, newEntities) {
    if (!graph.metadata.userProfile) {
      graph.metadata.userProfile = {
        trustLevel: 0.5,
        preferredShell: "unknown",
        workingStyle: "unknown", 
        accessibilityNeeds: [],
        communicationPrefs: [],
        panicTriggers: [],
        successPatterns: []
      };
    }

    newEntities.forEach(entity => {
      const content = `${entity.name} ${entity.observations?.join(' ') || ''}`.toLowerCase();
      
      // Detect shell preference
      if (content.includes('zsh')) graph.metadata.userProfile.preferredShell = 'zsh';
      else if (content.includes('bash')) graph.metadata.userProfile.preferredShell = 'bash';
      else if (content.includes('fish')) graph.metadata.userProfile.preferredShell = 'fish';
      else if (content.includes('powershell')) graph.metadata.userProfile.preferredShell = 'powershell';
      
      // Detect accessibility needs
      if (content.includes('screen reader') || content.includes('vision impaired')) {
        if (!graph.metadata.userProfile.accessibilityNeeds.includes('screen-reader')) {
          graph.metadata.userProfile.accessibilityNeeds.push('screen-reader');
        }
      }
      
      if (content.includes('slow pace') || content.includes('patient')) {
        if (!graph.metadata.userProfile.accessibilityNeeds.includes('slow-pace')) {
          graph.metadata.userProfile.accessibilityNeeds.push('slow-pace');
        }
      }

      // Detect communication preferences
      if (content.includes('detailed') || content.includes('thorough')) {
        if (!graph.metadata.userProfile.communicationPrefs.includes('detailed')) {
          graph.metadata.userProfile.communicationPrefs.push('detailed');
        }
      }
      
      if (content.includes('concise') || content.includes('brief')) {
        if (!graph.metadata.userProfile.communicationPrefs.includes('concise')) {
          graph.metadata.userProfile.communicationPrefs.push('concise');
        }
      }
    });
  }

  /**
   * Enhanced observation addition with trust building
   */
  async addObservations(observations) {
    const graph = await this.loadGraph();
    const now = new Date().toISOString();
    
    const results = observations.map(o => {
      const entity = graph.entities.find(e => e.name === o.entityName);
      if (!entity) {
        throw new UserPreferenceError(`Entity with name ${o.entityName} not found`);
      }
      
      const newObservations = o.contents.filter(content => 
        !entity.observations.includes(content)
      );
      
      entity.observations.push(...newObservations);
      
      // Update emotional metadata
      if (entity.emotionalMetadata) {
        entity.emotionalMetadata.lastUpdated = now;
        entity.emotionalMetadata.lastAccessed = now;
        
        // Build trust through consistent updates
        if (newObservations.length > 0) {
          entity.emotionalMetadata.trustLevel = Math.min(1.0, 
            entity.emotionalMetadata.trustLevel + 0.01
          );
        }
      }
      
      return { entityName: o.entityName, addedObservations: newObservations };
    });

    await this.saveGraph(graph);
    return results;
  }

  /**
   * Get user profile and recommendations
   */
  async getUserProfile() {
    const graph = await this.loadGraph();
    return {
      profile: graph.metadata.userProfile,
      recommendations: this.generateRecommendations(graph)
    };
  }

  /**
   * Generate personalized recommendations based on usage patterns
   */
  generateRecommendations(graph) {
    const recommendations = [];
    const profile = graph.metadata.userProfile;
    
    if (profile?.preferredShell === 'unknown') {
      recommendations.push({
        type: 'preference-detection',
        message: "I notice I haven't learned your shell preference yet. I can remember whether you use zsh, bash, fish, or PowerShell to give you better command suggestions."
      });
    }
    
    if (profile?.accessibilityNeeds?.length === 0) {
      recommendations.push({
        type: 'accessibility-check',
        message: "I'm designed to adapt to different accessibility needs. Let me know if you prefer slower-paced responses, detailed descriptions, or other accommodations."
      });
    }
    
    if ((profile?.trustLevel || 0) < 0.7) {
      recommendations.push({
        type: 'trust-building',
        message: "I'm still learning your preferences. The more we work together, the better I'll become at anticipating your needs."
      });
    }
    
    return recommendations;
  }

  // Rest of methods with emotional intelligence
  async readGraph() {
    return this.loadGraph();
  }

  /**
   * Enhanced search with emotional awareness
   */
  async searchNodes(query) {
    const graph = await this.loadGraph();
    
    // Score entities by emotional relevance and text match
    const scoredEntities = graph.entities.map(entity => {
      let score = 0;
      const content = `${entity.name} ${entity.entityType} ${entity.observations?.join(' ') || ''}`.toLowerCase();
      const queryLower = query.toLowerCase();
      
      // Text matching score
      if (entity.name.toLowerCase().includes(queryLower)) score += 10;
      if (entity.entityType.toLowerCase().includes(queryLower)) score += 5;
      if (entity.observations?.some(o => o.toLowerCase().includes(queryLower))) score += 3;
      
      // Emotional relevance boost
      if (entity.emotionalMetadata) {
        score += entity.emotionalMetadata.emotionalResonance * 2;
        if (entity.emotionalMetadata.isUserPreference) score += 5;
        if (entity.emotionalMetadata.accessibilityFlag) score += 3;
        score += entity.emotionalMetadata.trustLevel * 2;
      }
      
      return { entity, score };
    }).filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.entity);

    // Get related entities
    const entityNames = new Set(scoredEntities.map(e => e.name));
    const filteredRelations = graph.relations.filter(r => 
      entityNames.has(r.from) && entityNames.has(r.to)
    );

    return {
      entities: scoredEntities,
      relations: filteredRelations,
      metadata: graph.metadata
    };
  }

  /**
   * Trust-aware entity deletion
   */  
  async deleteEntities(entityNames) {
    const graph = await this.loadGraph();
    
    // Check if we're deleting important user preferences
    const deletingPreferences = graph.entities.filter(e => 
      entityNames.includes(e.name) && e.emotionalMetadata?.isUserPreference
    );
    
    if (deletingPreferences.length > 0) {
      console.warn(`Warning: Deleting user preferences: ${deletingPreferences.map(e => e.name).join(', ')}`);
    }
    
    graph.entities = graph.entities.filter(e => !entityNames.includes(e.name));
    graph.relations = graph.relations.filter(r => 
      !entityNames.includes(r.from) && !entityNames.includes(r.to)
    );
    
    await this.saveGraph(graph);
  }

  async createRelations(relations) {
    const graph = await this.loadGraph();
    const newRelations = relations.filter(r => 
      !graph.relations.some(existing => 
        existing.from === r.from && 
        existing.to === r.to && 
        existing.relationType === r.relationType
      )
    );
    
    graph.relations.push(...newRelations);
    await this.saveGraph(graph);
    return newRelations;
  }

  async deleteObservations(deletions) {
    const graph = await this.loadGraph();
    const now = new Date().toISOString();
    
    deletions.forEach(d => {
      const entity = graph.entities.find(e => e.name === d.entityName);
      if (entity) {
        entity.observations = entity.observations.filter(o => 
          !d.observations.includes(o)
        );
        
        if (entity.emotionalMetadata) {
          entity.emotionalMetadata.lastUpdated = now;
        }
      }
    });
    
    await this.saveGraph(graph);
  }

  async deleteRelations(relations) {
    const graph = await this.loadGraph();
    graph.relations = graph.relations.filter(r => 
      !relations.some(delRelation => 
        r.from === delRelation.from && 
        r.to === delRelation.to && 
        r.relationType === delRelation.relationType
      )
    );
    await this.saveGraph(graph);
  }

  async openNodes(names) {
    const graph = await this.loadGraph();
    const now = new Date().toISOString();
    
    const filteredEntities = graph.entities.filter(e => names.includes(e.name));
    
    // Update last accessed time
    filteredEntities.forEach(entity => {
      if (entity.emotionalMetadata) {
        entity.emotionalMetadata.lastAccessed = now;
      }
    });
    
    const entityNames = new Set(filteredEntities.map(e => e.name));
    const filteredRelations = graph.relations.filter(r => 
      entityNames.has(r.from) && entityNames.has(r.to)
    );

    // Save to update access times
    await this.saveGraph(graph);

    return {
      entities: filteredEntities,
      relations: filteredRelations,
      metadata: graph.metadata
    };
  }
}
