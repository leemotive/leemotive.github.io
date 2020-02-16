# rev-parse

Git的一个底层命令，功能丰富

- 显示分支
```bash
$ git rev-parse --symbolic --branches
```

- 显示tag
```bash
$ git rev-parse --symbolic --tags
```

- 显示定义的所有引用
```bash
$ git rev-parse --symbolic --glob="refs/*"
refs/heads/master
refs/remotes/origin/master
```

- 显示对应的哈希值
```bash
$ git rev-parse HEAD
```
可以空格分割添加多个分支，tag显示多个哈希值


