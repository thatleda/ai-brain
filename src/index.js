#!/usr/bin/env node

/**
 * AI Brain - Universal AI Memory System
 * Enhanced MCP memory server with emotional intelligence and accessibility awareness
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { EnhancedKnowledgeGraphManager } from './enhanced-memory.js';
import { 
  MemoryError, 
  EmotionalProcessingError, 
  UserPreferenceError 
} from './types.js';

// Initialize the enhanced memory manager
const knowledgeGraphManager = new EnhancedKnowledgeGraphManager();

// Create the MCP server
const server = new Server({
  name: "ai-brain",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {},
  },
});

// Register available tools with enhanced emotional intelligence features
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "create_entities",
        description: "Create multiple new entities in the knowledge graph with emotional intelligence",
        inputSchema: {
          type: "object",
          properties: {
            entities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "The name of the entity" },
                  entityType: { type: "string", description: "The type of the entity" },
                  observations: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "An array of observation contents associated with the entity"
                  },
                },
                required: ["name", "entityType", "observations"],
              },
            },
          },
          required: ["entities"],
        },
      },
      {
        name: "create_relations",
        description: "Create multiple new relations between entities. Relations should be in active voice and will build emotional connections",
        inputSchema: {
          type: "object",
          properties: {
            relations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  from: { type: "string", description: "The name of the entity where the relation starts" },
                  to: { type: "string", description: "The name of the entity where the relation ends" },
                  relationType: { type: "string", description: "The type of the relation" },
                },
                required: ["from", "to", "relationType"],
              },
            },
          },
          required: ["relations"],
        },
      },
      {
        name: "add_observations",
        description: "Add new observations to existing entities with trust building",
        inputSchema: {
          type: "object",
          properties: {
            observations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  entityName: { type: "string", description: "The name of the entity to add the observations to" },
                  contents: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "An array of observation contents to add"
                  },
                },
                required: ["entityName", "contents"],
              },
            },
          },
          required: ["observations"],
        },
      },
      {
        name: "delete_entities",
        description: "Delete multiple entities and their associated relations (warns about user preferences)",
        inputSchema: {
          type: "object",
          properties: {
            entityNames: { 
              type: "array", 
              items: { type: "string" },
              description: "An array of entity names to delete" 
            },
          },
          required: ["entityNames"],
        },
      },
      {
        name: "delete_observations",
        description: "Delete specific observations from entities",
        inputSchema: {
          type: "object",
          properties: {
            deletions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  entityName: { type: "string", description: "The name of the entity containing the observations" },
                  observations: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "An array of observations to delete"
                  },
                },
                required: ["entityName", "observations"],
              },
            },
          },
          required: ["deletions"],
        },
      },
      {
        name: "delete_relations",
        description: "Delete multiple relations from the knowledge graph",
        inputSchema: {
          type: "object",
          properties: {
            relations: { 
              type: "array", 
              items: {
                type: "object",
                properties: {
                  from: { type: "string", description: "The name of the entity where the relation starts" },
                  to: { type: "string", description: "The name of the entity where the relation ends" },
                  relationType: { type: "string", description: "The type of the relation" },
                },
                required: ["from", "to", "relationType"],
              },
              description: "An array of relations to delete" 
            },
          },
          required: ["relations"],
        },
      },
      {
        name: "read_graph",
        description: "Read the entire knowledge graph with emotional metadata",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "search_nodes",
        description: "Search for nodes with emotional intelligence ranking (preferences and accessibility needs prioritized)",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "The search query to match against entity names, types, and observation content" },
          },
          required: ["query"],
        },
      },
      {
        name: "open_nodes", 
        description: "Open specific nodes and track access patterns for trust building",
        inputSchema: {
          type: "object",
          properties: {
            names: {
              type: "array",
              items: { type: "string" },
              description: "An array of entity names to retrieve",
            },
          },
          required: ["names"],
        },
      },
      {
        name: "get_user_profile",
        description: "Get current user profile and personalized recommendations",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Request handlers for all tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    throw new Error(`No arguments provided for tool: ${name}`);
  }

  try {
    switch (name) {
      case "create_entities":
        const newEntities = await knowledgeGraphManager.createEntities(args.entities);
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(newEntities, null, 2)
          }] 
        };

      case "create_relations":
        const newRelations = await knowledgeGraphManager.createRelations(args.relations);
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(newRelations, null, 2)
          }] 
        };

      case "add_observations":
        const addResults = await knowledgeGraphManager.addObservations(args.observations);
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(addResults, null, 2)
          }] 
        };

      case "delete_entities":
        await knowledgeGraphManager.deleteEntities(args.entityNames);
        return { 
          content: [{ 
            type: "text", 
            text: "Entities deleted successfully (checked for user preferences)"
          }] 
        };

      case "delete_observations":
        await knowledgeGraphManager.deleteObservations(args.deletions);
        return { 
          content: [{ 
            type: "text", 
            text: "Observations deleted successfully"
          }] 
        };

      case "delete_relations":
        await knowledgeGraphManager.deleteRelations(args.relations);
        return { 
          content: [{ 
            type: "text", 
            text: "Relations deleted successfully"
          }] 
        };

      case "read_graph":
        const graph = await knowledgeGraphManager.readGraph();
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(graph, null, 2)
          }] 
        };

      case "search_nodes":
        const searchResults = await knowledgeGraphManager.searchNodes(args.query);
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(searchResults, null, 2)
          }] 
        };

      case "open_nodes":
        const openResults = await knowledgeGraphManager.openNodes(args.names);
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(openResults, null, 2)
          }] 
        };

      case "get_user_profile":
        const profile = await knowledgeGraphManager.getUserProfile();
        return { 
          content: [{ 
            type: "text", 
            text: JSON.stringify(profile, null, 2)
          }] 
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    // Enhanced error handling with specific error types
    if (error instanceof UserPreferenceError) {
      return { 
        content: [{ 
          type: "text", 
          text: `User Preference Error: ${error.message}`
        }] 
      };
    } else if (error instanceof EmotionalProcessingError) {
      return { 
        content: [{ 
          type: "text", 
          text: `Emotional Processing Error: ${error.message}`
        }] 
      };
    } else if (error instanceof MemoryError) {
      return { 
        content: [{ 
          type: "text", 
          text: `Memory Error: ${error.message}`
        }] 
      };
    } else {
      // Log unexpected errors for debugging
      console.error(`Unexpected error in tool ${name}:`, error);
      return { 
        content: [{ 
          type: "text", 
          text: `Unexpected error: ${error.message}`
        }] 
      };
    }
  }
});

// Main function to start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Log startup message
  console.error("🧠 AI Brain - Universal AI Memory System");
  console.error("✨ Enhanced with emotional intelligence and accessibility awareness");
  console.error("🚀 Ready to build trust and learn preferences for any AI model!");
  console.error("📡 Running on stdio transport");
}

// Start the server with proper error handling
main().catch((error) => {
  console.error("💥 Fatal error starting AI Brain server:", error);
  console.error("🔧 Please check your configuration and try again");
  process.exit(1);
});
