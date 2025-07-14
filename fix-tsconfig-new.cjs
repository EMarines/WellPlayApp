// Automatic fix for SvelteKit tsconfig deprecated options
// This script runs after svelte-kit sync to fix deprecated TypeScript options

const fs = require('fs');
const path = require('path');

const tsconfigPath = path.join(__dirname, '.svelte-kit', 'tsconfig.json');

try {
  if (fs.existsSync(tsconfigPath)) {
    let content = fs.readFileSync(tsconfigPath, 'utf8');
    
    // Parse JSON to work with object
    let config = JSON.parse(content);
    
    // Remove deprecated options
    if (config.compilerOptions) {
      delete config.compilerOptions.importsNotUsedAsValues;
      delete config.compilerOptions.preserveValueImports;
      
      // Add modern replacement
      config.compilerOptions.verbatimModuleSyntax = true;
    }
    
    // Write back properly formatted JSON
    const newContent = JSON.stringify(config, null, '\t');
    fs.writeFileSync(tsconfigPath, newContent, 'utf8');
    
    console.log('✅ Fixed deprecated TypeScript options in .svelte-kit/tsconfig.json');
  } else {
    console.log('⚠️  .svelte-kit/tsconfig.json not found, skipping fix');
  }
} catch (error) {
  console.error('❌ Error fixing tsconfig:', error.message);
}
