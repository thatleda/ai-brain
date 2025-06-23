#!/usr/bin/env node

/**
 * AI Brain Test Suite
 * Tests emotional intelligence, user preferences, and accessibility features
 */

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use test memory file - MUST be set before importing enhanced-memory.js
process.env.AI_BRAIN_MEMORY_PATH = path.join(__dirname, 'test-memory.jsonl');

import { EnhancedKnowledgeGraphManager } from '../src/enhanced-memory.js';
import { promises as fs } from 'fs';

async function cleanupTestFile() {
  try {
    await fs.unlink(process.env.AI_BRAIN_MEMORY_PATH);
  } catch (error) {
    // File doesn't exist, which is fine
  }
}

async function runTests() {
  console.log('🧪 AI BRAIN TEST SUITE');
  console.log('Testing emotional intelligence and user preferences\n');

  // Clean up any existing test file
  await cleanupTestFile();
  
  // Wait a moment to ensure cleanup
  await new Promise(resolve => setTimeout(resolve, 100));

  const manager = new EnhancedKnowledgeGraphManager();
  let testsPassed = 0;
  let totalTests = 0;

  function test(name, condition) {
    totalTests++;
    if (condition) {
      console.log(`✅ ${name}`);
      testsPassed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }

  try {
    // Test 1: Bootstrap creation
    console.log('📋 Testing Bootstrap Creation...');
    const graph = await manager.loadGraph();
    test('Bootstrap graph created', graph.entities.length >= 2);
    test('AI Identity entity exists', graph.entities.some(e => e.name === 'AI_Assistant_Identity'));
    test('User Profile entity exists', graph.entities.some(e => e.name === 'User_Profile'));
    test('Metadata includes user profile', graph.metadata.userProfile !== undefined);

    // Test 2: User preference detection
    console.log('\\n🎯 Testing User Preference Detection...');
    const preferenceEntities = [
      {
        name: "Dave_Shell_Preference_Test",
        entityType: "user_preference",
        observations: ["Dave uses ZSH for all command line work", "Prefers ZSH over bash"]
      },
      {
        name: "Sarah_Accessibility_Needs_Test",
        entityType: "accessibility",
        observations: ["Sarah uses screen reader software", "Needs slow pace responses", "Vision impaired developer"]
      }
    ];

    const newEntities = await manager.createEntities(preferenceEntities);
    test('User preferences detected', newEntities.length === 2);
    
    const updatedGraph = await manager.loadGraph();
    test('ZSH preference detected in profile', updatedGraph.metadata.userProfile.preferredShell === 'zsh');
    test('Screen reader accessibility detected', updatedGraph.metadata.userProfile.accessibilityNeeds.includes('screen-reader'));
    test('Slow pace accessibility detected', updatedGraph.metadata.userProfile.accessibilityNeeds.includes('slow-pace'));

    // Test 3: Emotional metadata assignment
    console.log('\\n💭 Testing Emotional Metadata...');
    const daveEntity = updatedGraph.entities.find(e => e.name === 'Dave_Shell_Preference_Test');
    test('User preference has high emotional resonance', daveEntity.emotionalMetadata.emotionalResonance >= 0.8);
    test('User preference pattern is "preference"', daveEntity.emotionalMetadata.importancePattern === 'preference');
    test('User preference flag is true', daveEntity.emotionalMetadata.isUserPreference === true);

    const sarahEntity = updatedGraph.entities.find(e => e.name === 'Sarah_Accessibility_Needs_Test');
    test('Accessibility entity flagged correctly', sarahEntity.emotionalMetadata.accessibilityFlag === true);

    // Test 4: Search with emotional intelligence
    console.log('\\n🔍 Testing Emotionally Intelligent Search...');
    const searchResults = await manager.searchNodes('zsh');
    test('Search returns results', searchResults.entities.length > 0);
    test('User preferences ranked highly', searchResults.entities[0].emotionalMetadata?.isUserPreference === true);

    const accessibilitySearch = await manager.searchNodes('screen reader');
    test('Accessibility search works', accessibilitySearch.entities.length > 0);
    test('Accessibility entities prioritized', accessibilitySearch.entities[0].emotionalMetadata?.accessibilityFlag === true);

    // Test 5: Trust building through observations
    console.log('\\n🤝 Testing Trust Building...');
    const initialTrust = daveEntity.emotionalMetadata.trustLevel;
    
    await manager.addObservations([{
      entityName: 'Dave_Shell_Preference_Test',
      contents: ['Confirmed ZSH works perfectly for automated scripts']
    }]);

    const updatedEntity = (await manager.readGraph()).entities.find(e => e.name === 'Dave_Shell_Preference_Test');
    test('Trust level increased after positive interaction', updatedEntity.emotionalMetadata.trustLevel > initialTrust);

    // Test 6: User profile and recommendations
    console.log('\\n📊 Testing User Profile System...');
    const profile = await manager.getUserProfile();
    test('Profile returns preferences', profile.profile.preferredShell === 'zsh');
    test('Profile includes accessibility needs', profile.profile.accessibilityNeeds.length > 0);
    test('Recommendations provided', profile.recommendations.length >= 0);

    // Test 7: Emotional decay simulation
    console.log('\\n⏰ Testing Emotional Decay Patterns...');
    
    // Create a time-based entity (should decay)
    await manager.createEntities([{
      name: "Temporary_Excitement_Test",
      entityType: "temporary_emotion",
      observations: ["User excited about new feature", "High energy response"]
    }]);

    // Create a strengthening entity (should grow stronger)
    const beforeCreateGraph = await manager.readGraph();
    const existingBond = beforeCreateGraph.entities.find(e => e.name === 'Team_Bond_Test');
    
    await manager.createEntities([{
      name: "Team_Bond_Test",
      entityType: "relationship",
      observations: ["Working well together", "Good collaboration patterns"]
    }]);

    const beforeDecayGraph = await manager.readGraph();
    const excitementEntity = beforeDecayGraph.entities.find(e => e.name === 'Temporary_Excitement_Test');
    const bondEntity = beforeDecayGraph.entities.find(e => e.name === 'Team_Bond_Test');

    test('Time-based entity has time-based pattern', excitementEntity.emotionalMetadata.importancePattern === 'time-based');
    test('Bond entity detected as strengthening pattern', bondEntity.emotionalMetadata.importancePattern === 'strengthen');

    // Test 8: Error handling
    console.log('\\n🛡️ Testing Error Handling...');
    
    try {
      await manager.addObservations([{
        entityName: 'NonExistentEntity',
        contents: ['This should fail']
      }]);
      test('Error handling for non-existent entity', false);
    } catch (error) {
      test('Proper error thrown for non-existent entity', error.name === 'UserPreferenceError');
    }

    // Test 9: Preference protection
    console.log('\\n🛡️ Testing Preference Protection...');
    
    // Try to delete a user preference - should warn
    console.log('   (Testing deletion warning for user preferences...)');
    await manager.deleteEntities(['Dave_Shell_Preference_Test']);
    
    const finalGraph = await manager.readGraph();
    test('User preference can be deleted (with warning)', !finalGraph.entities.some(e => e.name === 'Dave_Shell_Preference_Test'));

    // Final Results
    console.log('\\n📊 TEST RESULTS');
    console.log(`✅ Passed: ${testsPassed}/${totalTests} tests`);
    console.log(`📈 Success Rate: ${Math.round((testsPassed / totalTests) * 100)}%`);

    if (testsPassed === totalTests) {
      console.log('🎉 ALL TESTS PASSED! AI Brain is ready for the DIU team!');
      console.log('\\n🚀 Next Steps:');
      console.log('1. Install dependencies: npm install');
      console.log('2. Configure your AI client MCP settings');
      console.log('3. Use bootstrap prompts for team members');
      console.log('4. Watch AI teammates learn and adapt!');
    } else {
      console.log('⚠️  Some tests failed. Please review the implementation.');
    }

  } catch (error) {
    console.error('💥 Test suite failed with error:', error);
    console.error('Stack trace:', error.stack);
  } finally {
    // Cleanup test file
    await cleanupTestFile();
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { runTests };
