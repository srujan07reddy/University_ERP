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

  const brokenImportPattern = /(import\s+\{\s*\r?\n)(import \{ GlobalScrollView \} from '[^']+';\r?\n)/g;
  
  if (content.match(brokenImportPattern)) {
      content = content.replace(brokenImportPattern, '$2$1');
      fs.writeFileSync(filePath, content);
      console.log('Cleaned broken import in', filePath);
  }
});
