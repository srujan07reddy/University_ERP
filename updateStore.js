const fs = require('fs');

let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

// Replace roles in the appointable rules
code = code.replace(/Chancellor: \[.*?\],/g, '');
code = code.replace(/ViceChancellor: \[.*?\],/g, '');
code = code.replace(/ProVC: \[.*?\],/g, '');
code = code.replace(/Registrar: \[.*?\],/g, '');
code = code.replace(/Admin: \[.*?\],/g, "Administration: ['Dean', 'Finance', 'Faculty', 'Student', 'Parent', 'PlacementOfficer', 'CoE', 'HoD', 'Admissions', 'BusIncharge', 'MessIncharge'],");

// Replace roles in the MOCK_USERS if any
code = code.replace(/'Admin'/g, "'Administration'");
code = code.replace(/'Chancellor'/g, "'Administration'");
code = code.replace(/'ViceChancellor'/g, "'Administration'");
code = code.replace(/'ProVC'/g, "'Administration'");
code = code.replace(/'Registrar'/g, "'Administration'");

// Replace approval hierarchy logic
code = code.replace(/else if \(currentApproverRole === 'HoD'\) nextRole = 'Dean';/g, "else if (currentApproverRole === 'HoD') nextRole = 'Dean';\n          else if (currentApproverRole === 'Dean') nextRole = 'Administration';");
code = code.replace(/else if \(currentApproverRole === 'Dean'\) nextRole = 'Registrar';/g, "");
code = code.replace(/else if \(currentApproverRole === 'Registrar'\) nextRole = 'ProVC';/g, "");
code = code.replace(/else if \(currentApproverRole === 'ProVC'\) nextRole = 'ViceChancellor';/g, "");
code = code.replace(/else if \(currentApproverRole === 'ViceChancellor'\) nextRole = 'Chancellor';/g, "");
code = code.replace(/else if \(currentApproverRole === 'Chancellor'\) nextRole = null;/g, "else if (currentApproverRole === 'Administration') nextRole = null;");

fs.writeFileSync('src/store/useStore.ts', code);
console.log('Updated useStore.ts');
