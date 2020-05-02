# execa
用于执行 shell 脚本并返回结果，

```js
const execa = require('execa');

const {stdout} = await execa('curl', ['some url'])
```

stdout 就是命令的返回结果，当然代码中的 await 是需要配置 async 使用的

如果要使用 pipe 将结果作为另一个命令的输入，是不能简单的像在终端一样使用 | 的。可像如下使用

```js
const curl = execa('curl', ['some url']);

const iconv = execa('iconv', ['-f', 'gbk', '-t', 'utf-8']);

curl.stdout.pipe(iconv.stdin);

const {stdout} = await iconv;
```

如此使用 stdout 就是最终结果
