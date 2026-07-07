const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('src', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // First, fix the double-nested ScrollView in components like AnalyticsView
    const doubleScrollMatch = /<ScrollView\s+style=\{\{\s*flex:\s*1\s*\}\}\s+contentContainerStyle=\{\{\s*flexGrow:\s*1,\s*paddingBottom:\s*24\s*\}\}\s+showsVerticalScrollIndicator=\{true\}\s+showsHorizontalScrollIndicator=\{true\}>\s*<ScrollView/g;
    
    if (content.match(doubleScrollMatch)) {
       content = content.replace(doubleScrollMatch, '<ScrollView');
       content = content.replace(/<\/ScrollView>\s*<\/ScrollView>/g, '</ScrollView>');
    }

    // Now, replace the standard inline ScrollView with GlobalScrollView
    // Only replace root-level structural ScrollViews, not horizontal ones
    const boilerplateMatch = /<ScrollView\s+style=\{\{\s*flex:\s*1.*\}\}\s+contentContainerStyle=\{.*paddingBottom:\s*24\s*\}.*showsVerticalScrollIndicator=\{true\}.*>/g;
    
    if (content.match(boilerplateMatch)) {
       content = content.replace(boilerplateMatch, '<GlobalScrollView>');
       content = content.replace(/<\/ScrollView>/g, '</GlobalScrollView>');
       
       // Ensure GlobalScrollView is imported
       if (!content.includes('GlobalScrollView')) {
           // We need to calculate the relative path to components/Navigation/GlobalScrollView
           const depth = filePath.split(path.sep).length - 2; // -1 for src, -1 for file itself
           const relativePrefix = depth === 0 ? './' : '../'.repeat(depth);
           const importStatement = `import { GlobalScrollView } from '${relativePrefix}components/Navigation/GlobalScrollView';\n`;
           
           // Insert after the last import
           const lastImportIndex = content.lastIndexOf('import ');
           const endOfLastImport = content.indexOf('\n', lastImportIndex);
           content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);
       }
    }
    
    // Also catch the specific Chancellor/ProVC dashboard mobile menus
    const mobileMenuScrollMatch = /<ScrollView\s+style=\{\{\s*flex:\s*1,\s*width:\s*'100%'\s*\}\}\s+contentContainerStyle=\{\{\s*flexGrow:\s*1\s*\}\}\s+showsVerticalScrollIndicator=\{true\}.*>/g;
    if (content.match(mobileMenuScrollMatch)) {
       content = content.replace(mobileMenuScrollMatch, '<GlobalScrollView>');
       content = content.replace(/<\/ScrollView>/g, '</GlobalScrollView>');
       
       if (!content.includes('GlobalScrollView')) {
           const depth = filePath.split(path.sep).length - 2;
           const relativePrefix = depth === 0 ? './' : '../'.repeat(depth);
           const importStatement = `import { GlobalScrollView } from '${relativePrefix}components/Navigation/GlobalScrollView';\n`;
           
           const lastImportIndex = content.lastIndexOf('import ');
           const endOfLastImport = content.indexOf('\n', lastImportIndex);
           content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);
       }
    }

    // Convert fixed w-[600px] or other hardcoded desktop structures to mobile-responsive
    content = content.replace(/w-\[600px\]/g, 'w-full md:w-[600px]');
    content = content.replace(/w-\[48%\]/g, 'w-full md:w-[48%] xl:w-[23%]');
    content = content.replace(/className="flex-row items-center"/g, 'className="flex-col md:flex-row items-start md:items-center gap-4 md:gap-0"');

    if (content !== original) {
      // Fix cases where we might have replaced closing tags but there were horizontal scrollviews
      // We assume the script primarily replaced vertical containers.
      // A more robust AST parser is ideal, but given the structure, this regex targets specific boilerplate.
      fs.writeFileSync(filePath, content);
      console.log('Reconstructed Scroll in ' + filePath);
      count++;
    }
  }
});

console.log('Reconstructed scroll logic in ' + count + ' files.');
