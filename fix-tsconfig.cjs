// Automatic fix for SvelteKit tsconfig deprecated options
// This script runs after svelte-kit sync to fix deprecated TypeScript options

const fs = require('fs');
const path = require('path');

const tsconfigPath = path.join(__dirname, '.svelte-kit', 'tsconfig.json');

try {
  if (fs.existsSync(tsconfigPath)) {
    let content = fs.readFileSync(tsconfigPath, 'utf8');
    
    console.log('Original content preview:', content.substring(0, 200));
    
    // Remove deprecated options with better regex patterns
    const beforeReplace = content;
    
    // Remove importsNotUsedAsValues line completely
    content = content.replace(/^\s*"importsNotUsedAsValues"\s*:\s*"[^"]*",?\s*$/gm, '');
    
    // Remove preserveValueImports line completely  
    content = content.replace(/^\s*"preserveValueImports"\s*:\s*[^,\n]*,?\s*$/gm, '');
    
    // Clean up any double commas that might result
    content = content.replace(/,\s*,/g, ',');
    
    // Add verbatimModuleSyntax if not present
    if (!content.includes('verbatimModuleSyntax')) {
      content = content.replace(
        /"isolatedModules"\s*:\s*true/,
        '"verbatimModuleSyntax": true,\n\t\t"isolatedModules": true'
      );
    }
    
    if (beforeReplace !== content) {
      fs.writeFileSync(tsconfigPath, content);
      console.log('✅ Fixed deprecated TypeScript options in .svelte-kit/tsconfig.json');
    } else {
      console.log('ℹ️  No deprecated options found to fix');
    }
  } else {
    console.log('❌ .svelte-kit/tsconfig.json not found');
  }
} catch (error) {
  console.error('❌ Error fixing tsconfig:', error.message);
}
