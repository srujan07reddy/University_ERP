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

  // We have a situation where </ScrollView> was globally replaced by </GlobalScrollView>.
  // So there are some <ScrollView ... > tags that are closed by </GlobalScrollView>.
  // And there are <GlobalScrollView ... > tags that are correctly closed by </GlobalScrollView>.
  
  // Let's tokenize by <ScrollView, <GlobalScrollView, </ScrollView>, and </GlobalScrollView>.
  // Then we reconstruct the document by matching them properly.
  
  // This is a simple tokenizer that finds all these 4 patterns in order.
  const regex = /<ScrollView[^>]*>|<GlobalScrollView[^>]*>|<\/ScrollView>|<\/GlobalScrollView>/g;
  
  let match;
  let stack = [];
  let newContent = '';
  let lastIndex = 0;
  
  // We will build newContent by replacing closing tags based on the stack.
  // Actually, since we only messed up the closing tags (changed them all to </GlobalScrollView>), 
  // we just need to read the stack. If the stack top is 'ScrollView', the closing tag MUST be </ScrollView>.
  
  let valid = true;
  while ((match = regex.exec(content)) !== null) {
      const tag = match[0];
      newContent += content.slice(lastIndex, match.index);
      
      if (tag.startsWith('<ScrollView') && !tag.endsWith('/>')) {
          stack.push('ScrollView');
          newContent += tag;
      } else if (tag.startsWith('<GlobalScrollView') && !tag.endsWith('/>')) {
          stack.push('GlobalScrollView');
          newContent += tag;
      } else if (tag === '</ScrollView>' || tag === '</GlobalScrollView>') {
          if (stack.length === 0) {
              valid = false; break;
          }
          const expected = stack.pop();
          newContent += `</${expected}>`;
      } else {
          newContent += tag;
      }
      
      lastIndex = regex.lastIndex;
  }
  
  if (valid && stack.length === 0) {
      newContent += content.slice(lastIndex);
      if (newContent !== original) {
          fs.writeFileSync(filePath, newContent);
          console.log('Fixed tags in', filePath);
      }
  }
});
