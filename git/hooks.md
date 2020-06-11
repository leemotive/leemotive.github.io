# hooks

项目经常使用 husky 来在特定 git 操作时进行一些检查，但是比如在 pre-commit 的时候执行 eslint prettier 进行格式化

但是如果电脑上使用的是 nvm 来管理电脑上的 node 版本。在 sourcetree 上进行 commit 的时候可能会无法正常进行检查，而直接就 commit 成功了

可以在 用户目录下添加 `.huskyrc` 文件添加如下内容

```bash
export PATH="/usr/local/bin/:$PATH"
```

