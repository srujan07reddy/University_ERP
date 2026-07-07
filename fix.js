const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('Dashboard.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src/screens');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const searchString = '<ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 32, paddingBottom: 300 }} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} className="">';
    const replaceString = '<View style={{ flex: 1, padding: 32, paddingBottom: 300 }} className="">';
    
    if (content.includes(searchString)) {
        content = content.replace(searchString, replaceString);
        content = content.replace(/<\/ScrollView>\s*<\/View>\s*<\/View>\s*\{\/\* Modals/g, '</View>\n        </View>\n      </View>\n\n      {/* Modals');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed:', file);
    }
});
