const fs = require('fs');
let code = fs.readFileSync('src/navigation/RootNavigator.tsx', 'utf8');

// Remove old imports
code = code.replace(/import \{ AdminDashboard \} from '..\\/screens\\/Admin\\/AdminDashboard';\\n/g, '');
code = code.replace(/import \{ ChancellorDashboard \} from '..\\/screens\\/Chancellor\\/ChancellorDashboard';\\n/g, '');
code = code.replace(/import \{ VCDashboard \} from '..\\/screens\\/VC\\/VCDashboard';\\n/g, '');
code = code.replace(/import \{ ProVCDashboard \} from '..\\/screens\\/ProVC\\/ProVCDashboard';\\n/g, '');
code = code.replace(/import \{ RegistrarDashboard \} from '..\\/screens\\/Registrar\\/RegistrarDashboard';\\n/g, '');

// Add new import
code = code.replace(/\\/\\/ University Screens\\n/g, "// University Screens\nimport { AdministrationDashboard } from '../screens/Administration/AdministrationDashboard';\n");

// Remove old stacks
code = code.replace(/\{user\.role === 'Admin' && \\([\\s\\S]*?<Stack\\.Screen name="AdminStack" component=\{AdminDashboard\} \\/>[\\s\\S]*?\\)\\}\\n/g, '');
code = code.replace(/\{user\.role === 'Chancellor' && \\([\\s\\S]*?<Stack\\.Screen name="ChancellorStack" component=\{ChancellorDashboard\} \\/>[\\s\\S]*?\\)\\}\\n/g, '');
code = code.replace(/\{user\.role === 'ViceChancellor' && \\([\\s\\S]*?<Stack\\.Screen name="VCStack" component=\{VCDashboard\} \\/>[\\s\\S]*?\\)\\}\\n/g, '');
code = code.replace(/\{user\.role === 'ProVC' && \\([\\s\\S]*?<Stack\\.Screen name="ProVCStack" component=\{ProVCDashboard\} \\/>[\\s\\S]*?\\)\\}\\n/g, '');
code = code.replace(/\{user\.role === 'Registrar' && \\([\\s\\S]*?<Stack\\.Screen name="RegistrarStack" component=\{RegistrarDashboard\} \\/>[\\s\\S]*?\\)\\}\\n/g, '');

// Add new stack
code = code.replace(/<>\\n/g, "<>\n              {user.role === 'Administration' && (\n                <Stack.Screen name=\"AdministrationStack\" component={AdministrationDashboard} />\n              )}\n");

fs.writeFileSync('src/navigation/RootNavigator.tsx', code);
console.log('Updated RootNavigator.tsx');
