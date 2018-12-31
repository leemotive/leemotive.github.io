```js
const exec = require('child_process').execSync;
const currentBranch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();
console.log(currentBranch);
```
