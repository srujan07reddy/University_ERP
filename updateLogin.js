const fs = require('fs');

let code = fs.readFileSync('src/screens/LoginScreen.tsx', 'utf8');

const rolesToReplace = `[
                  'Chancellor',
                  'ViceChancellor',
                  'ProVC',
                  'Registrar',
                  'Dean',
                  'HoD',
                  'CoE',
                  'Admissions',
                  'PlacementOfficer',
                  'Finance',
                  'Admin',
                  'Faculty',
                  'Student',
                  'Parent',
                  'BusIncharge',
                  'MessIncharge',
                ]`;

const newRoles = `[
                  'Administration',
                  'Dean',
                  'HoD',
                  'CoE',
                  'Admissions',
                  'PlacementOfficer',
                  'Finance',
                  'Faculty',
                  'Student',
                  'Parent',
                  'BusIncharge',
                  'MessIncharge',
                ]`;

code = code.replace(rolesToReplace, newRoles);
fs.writeFileSync('src/screens/LoginScreen.tsx', code);
console.log('Updated LoginScreen.tsx');
