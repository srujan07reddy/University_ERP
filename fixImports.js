const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) { 
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.tsx')) {
      callback(dirPath);
    }
  });
}

walkDir('src', function(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // 1. Fix missing imports
  if (content.includes('<GlobalScrollView') || content.includes('</GlobalScrollView>')) {
    if (!content.includes('import { GlobalScrollView }')) {
      const depth = filePath.split(path.sep).length - 2;
      const relativePrefix = depth === 0 ? './' : '../'.repeat(depth);
      const importStatement = `import { GlobalScrollView } from '${relativePrefix}components/Navigation/GlobalScrollView';\n`;
      
      // Insert after the last import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);
      } else {
        content = importStatement + content;
      }
    }
  }

  // 2. Fix tag mismatches
  // The script erroneously replaced ALL </ScrollView> with </GlobalScrollView>
  // We need to revert </GlobalScrollView> back to </ScrollView> IF the corresponding open tag is <ScrollView>
  // A simple heuristic for our specific broken files:
  // If the file is a Dashboard or AdminAnalyticsTab, there are <ScrollView> tags that got their closing tags hijacked.
  // Actually, an easier way is to just replace ALL </GlobalScrollView> back to </ScrollView>,
  // AND replace ALL <GlobalScrollView> back to <ScrollView>, effectively undoing the rename for the tag name,
  // BUT we want to keep GlobalScrollView!
  
  fs.writeFileSync(filePath, content);
});

console.log('Fixed missing imports.');
