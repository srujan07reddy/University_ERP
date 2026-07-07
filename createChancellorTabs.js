const fs = require('fs');
const path = require('path');

const tabs = [
  { name: 'ChancellorStatsTab', content: `import React from 'react';\nimport { View, Text } from 'react-native';\nimport { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';\n\nexport const ChancellorStatsTab = () => (\n  <GlobalScrollView>\n    <View className="flex-1 items-center justify-center py-20">\n      <Text className="text-white text-2xl font-bold">Institutional Health Stats</Text>\n      <Text className="text-slate-400 mt-2">Comprehensive health metrics coming soon.</Text>\n    </View>\n  </GlobalScrollView>\n);\n` },
  { name: 'ChancellorComplianceTab', content: `import React from 'react';\nimport { View, Text } from 'react-native';\nimport { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';\n\nexport const ChancellorComplianceTab = () => (\n  <GlobalScrollView>\n    <View className="flex-1 items-center justify-center py-20">\n      <Text className="text-white text-2xl font-bold">Compliance Audit</Text>\n      <Text className="text-slate-400 mt-2">NAAC and regulatory compliance tracker coming soon.</Text>\n    </View>\n  </GlobalScrollView>\n);\n` },
  { name: 'ChancellorReportsTab', content: `import React from 'react';\nimport { View, Text } from 'react-native';\nimport { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';\n\nexport const ChancellorReportsTab = () => (\n  <GlobalScrollView>\n    <View className="flex-1 items-center justify-center py-20">\n      <Text className="text-white text-2xl font-bold">Governance Reports</Text>\n      <Text className="text-slate-400 mt-2">Automated report generation coming soon.</Text>\n    </View>\n  </GlobalScrollView>\n);\n` },
  { name: 'ChancellorSafeChatTab', content: `import React from 'react';\nimport { MessageCenter } from '../../components/Dashboard/MessageCenter';\n\nexport const ChancellorSafeChatTab = () => {\n  return <MessageCenter />;\n};\n` },
  { name: 'ChancellorProfileTab', content: `import React from 'react';\nimport { View, Text } from 'react-native';\nimport { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';\n\nexport const ChancellorProfileTab = () => (\n  <GlobalScrollView>\n    <View className="flex-1 items-center justify-center py-20">\n      <Text className="text-white text-2xl font-bold">Chancellor Profile</Text>\n      <Text className="text-slate-400 mt-2">Profile management coming soon.</Text>\n    </View>\n  </GlobalScrollView>\n);\n` },
  { name: 'ChancellorSettingsTab', content: `import React from 'react';\nimport { View, Text } from 'react-native';\nimport { GlobalScrollView } from '../../components/Navigation/GlobalScrollView';\n\nexport const ChancellorSettingsTab = () => (\n  <GlobalScrollView>\n    <View className="flex-1 items-center justify-center py-20">\n      <Text className="text-white text-2xl font-bold">Settings</Text>\n      <Text className="text-slate-400 mt-2">System settings coming soon.</Text>\n    </View>\n  </GlobalScrollView>\n);\n` }
];

tabs.forEach(tab => {
  const filePath = path.join('src', 'screens', 'Chancellor', `${tab.name}.tsx`);
  fs.writeFileSync(filePath, tab.content);
  console.log(`Created ${filePath}`);
});
