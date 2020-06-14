# 不使用配置文件

在项目目录中如果存在 babel 的配置文件，比如 `.babelrc, babel.config.js` 等文件时。如果在代码中执行 `babel.transform` 之类的代码的时候，会自动读取这些配置文件，如果实际情况是不需要这些配置，可以在执行代码时添加配置 configFile 配置

```js
babel.transform(content, {
  configFile: false,
})
```

如此便不会使用配置文件中的配置了