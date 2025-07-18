#!/usr/bin/env node
// 🔍 TypeScript Configuration Diagnostic Tool
// Use: node diagnose-typescript.js

const fs = require('fs');
const path = require('path');

console.log('🔍 WellPlay TypeScript Configuration Diagnostic\n');

// Check main tsconfig.json
const mainTsConfig = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(mainTsConfig)) {
  const content = fs.readFileSync(mainTsConfig, 'utf8');
  const config = JSON.parse(content);
  
  console.log('📋 Main tsconfig.json:');
  
  if (config.extends) {
    console.log('⚠️  WARNING: Using "extends" - potential source of deprecated options');
    console.log(`   Extends: ${config.extends}`);
  } else {
    console.log('✅ Independent configuration (recommended)');
  }
  
  // Check for deprecated options
  const deprecated = ['importsNotUsedAsValues', 'preserveValueImports'];
  const hasDeprecated = deprecated.some(opt => config.compilerOptions?.[opt]);
  
  if (hasDeprecated) {
    console.log('❌ FOUND deprecated options in main config');
    deprecated.forEach(opt => {
      if (config.compilerOptions?.[opt]) {
        console.log(`   - ${opt}: ${config.compilerOptions[opt]}`);
      }
    });
  } else {
    console.log('✅ No deprecated options in main config');
  }
} else {
  console.log('❌ tsconfig.json not found');
}

// Check SvelteKit generated config
const svelteKitConfig = path.join(__dirname, '.svelte-kit', 'tsconfig.json');
if (fs.existsSync(svelteKitConfig)) {
  const content = fs.readFileSync(svelteKitConfig, 'utf8');
  const config = JSON.parse(content);
  
  console.log('\n📋 SvelteKit generated tsconfig.json:');
  
  const deprecated = ['importsNotUsedAsValues', 'preserveValueImports'];
  const foundDeprecated = [];
  
  deprecated.forEach(opt => {
    if (config.compilerOptions?.[opt]) {
      foundDeprecated.push(`${opt}: ${config.compilerOptions[opt]}`);
    }
  });
  
  if (foundDeprecated.length > 0) {
    console.log('⚠️  Contains deprecated options (this is normal, but causes issues if extended):');
    foundDeprecated.forEach(opt => console.log(`   - ${opt}`));
  } else {
    console.log('✅ No deprecated options found');
  }
} else {
  console.log('\n📋 SvelteKit generated tsconfig.json: Not found (run svelte-kit sync)');
}

// Check package.json scripts
const packageJson = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJson)) {
  const content = fs.readFileSync(packageJson, 'utf8');
  const pkg = JSON.parse(content);
  
  console.log('\n📋 Package.json scripts:');
  
  const buildScript = pkg.scripts?.build;
  if (buildScript) {
    if (buildScript.includes('fix-tsconfig')) {
      console.log('⚠️  Build script includes tsconfig fix (may indicate config issues)');
    } else {
      console.log('✅ Clean build script');
    }
    console.log(`   Build: ${buildScript}`);
  }
}

console.log('\n🎯 Recommendations:');
console.log('   1. Use independent tsconfig.json (no "extends")');
console.log('   2. Include all necessary paths and options explicitly');
console.log('   3. Avoid extending .svelte-kit/tsconfig.json');
console.log('   4. See TYPESCRIPT_FIX_DOCUMENTATION.md for details');

console.log('\n📚 For complete solution see: TYPESCRIPT_FIX_DOCUMENTATION.md');
