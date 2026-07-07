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
  if (filePath.endsWith('Dashboard.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const target = `style={{ width: 280, flexShrink: 0, flexGrow: 0, backgroundColor: '#0B0F19', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)', height: '100%' }} contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className=""`;
    
    if (content.includes(target)) {
      const replacement = target.replace('className=""', 'className="hidden lg:flex flex-col"');
      fs.writeFileSync(filePath, content.replace(target, replacement));
      console.log('Fixed ' + filePath);
      count++;
    }
  }
});

console.log('Fixed ' + count + ' files.');
