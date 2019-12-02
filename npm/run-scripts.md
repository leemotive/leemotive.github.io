# run-scripts

在package.json里面scripts字段里面定义的脚本可以通过`npm run`来调用
```json
{
  "scripts": {
    "build": "node build.js"
  }
}
```

以前在需要多个环境的时候一般是`npm run build:dev`和`npm run build:test`。同时在script字段里面添加`build:dev`和`build:test`两个命令

阅读npm官方文档才发现`npm run`是可以添加运行参数的
`npm run build -- port 5000`这样的命令在build.js文件里通过`process.argv`获得的结果是
```javascript
[ '/usr/local/bin/node',
  '/Users/lee/Documents/spare/demo/index.js',
  'port',
  '5000' ]
```

这就可以拿到参数了


文档中还提到了
> You can use the --silent flag to prevent showing npm ERR! output on error.

可以通过`--slient`来荧屏蔽掉npm错误消息


> You can use the --if-present flag to avoid exiting with a non-zero exit code when the script is undefined. This lets you run potentially undefined scripts without breaking the execution chain.

可以通过`--if-preset`在脚本未定义的时候返回非零值
