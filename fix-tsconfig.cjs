// Automatic fix for SvelteKit tsconfig deprecated options
// This script runs after svelte-kit sync to fix deprecated TypeScript options

const fs = require('fs');
const path = require('path');

const tsconfigPath = path.join(__dirname, '.svelte-kit', 'tsconfig.json');

try {
  if (fs.existsSync(tsconfigPath)) {
    let content = fs.readFileSync(tsconfigPath, 'utf8');
    
    // Replace deprecated options with modern equivalents
    content = content.replace(/\s*"importsNotUsedAsValues"\s*:\s*"[^"]*",?\s*/g, '');
    content = content.replace(/\s*"preserveValueImports"\s*:\s*[^,}]*/g, '');
    
    // Add verbatimModuleSyntax if not present
    if (!content.includes('verbatimModuleSyntax')) {
      content = content.replace(
        /"isolatedModules"\s*:\s*true/,
        '"verbatimModuleSyntax": true,\n\t\t"isolatedModules": true'
      );
    }
    
    fs.writeFileSync(tsconfigPath, content);
    console.log('Fixed deprecated TypeScript options in .svelte-kit/tsconfig.json');
  }
} catch (error) {
  console.error('Error fixing tsconfig:', error.message);
}
