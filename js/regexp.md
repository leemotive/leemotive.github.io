# RegExp

/Users/lee/Documents/spare/eslint-prettier/node_modules/cross-spawn/node_modules/semver 去除路径中最后一个node_modules后面的路径

一开始想到的是非贪婪模式

```javascript
'/Users/lee/Documents/spare/eslint-prettier/node_modules/cross-spawn/node_modules/semver'.match(/(node_modules).*?$/)
```

然而实际情况是匹配到了从第一个node_modules开始的路径，失败。为什么这里的非贪婪模式不起作用了。看来贪婪模式只有影响后面的匹配


正确的使用方法如下
```javascript
'/Users/lee/Documents/spare/eslint-prettier/node_modules/cross-spawn/node_modules/semver'.match(/(.*)(node_modules).*$/)
```
起始位置处使用`.*`来做贪婪匹配
