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
walkDir('src/screens', function(filePath) {
  if (filePath.endsWith('Tab.tsx') || filePath.endsWith('Portal.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Convert flex-row StatCard grids to responsive stacks
    content = content.replace(/className="flex-row mb-6"/g, 'className="flex-col md:flex-row gap-4 mb-6"');
    content = content.replace(/className="flex-row mb-8"/g, 'className="flex-col md:flex-row gap-4 mb-8"');
    content = content.replace(/className="flex-row gap-4 mb-8"/g, 'className="flex-col md:flex-row gap-4 mb-8"');
    content = content.replace(/className="flex-row gap-6 mb-8"/g, 'className="flex-col md:flex-row gap-6 mb-8"');
    
    // Ensure all w-1/2 or fixed width flex children are full width on mobile
    content = content.replace(/className="flex-1 /g, 'className="flex-1 w-full md:w-auto ');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Refactored ' + filePath);
      count++;
    }
  }
});

console.log('Refactored ' + count + ' tab files for responsive grids.');
