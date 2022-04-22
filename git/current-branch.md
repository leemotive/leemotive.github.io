# nodejs获取当前分支

```js
const exec = require('child_process').execSync;
const currentBranch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();
console.log(currentBranch);
```

或者执行

```git
git symbolic-ref --short -q HEAD
```

