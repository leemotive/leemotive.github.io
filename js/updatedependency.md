# 更新package.json里面同域下面的库
```javascript
const package = require('./package.json');
const exec = require('child_process').execSync;

const devKeys = Object.keys(package.devDependencies).filter(key => key.startsWith('@name'));
exec(`yarn add ${devKeys.join(' ')} --dev`);

const keys = Object.keys(package.dependencies).filter(key => key.startsWith('@name'));
exec(`yarn add ${keys.join(' ')}`);
```
