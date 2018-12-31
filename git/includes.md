```js
var exec = require('child_process').execSync;

exec('git fetch -qn origin master');
const revlist = exec('git rev-list origin/master').toString().trim().split(/\s+/);
let lag, lead;
lag = revlist.findIndex(rev => lead = exec(`git log --pretty=oneline | grep -n ${rev} | cut -d':' -f1`).toString().trim());
if (lag) {
  console.log('\033[31;1m当前分支落后master分支', lag, '个版本');
  console.log('\033[36m当前分支领先master分支', lead - 1, '个版本\033[0m');
  process.exit(1);
} else {
  console.log('\033[32m当前分支包含master分支\033[0m');
}
```
