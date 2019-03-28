# 查看最新commitid

HEAD所指
```bash
git rev-parse HEAD
```

指定分支的最新commitid
```bash
git rev-parse dev
```

指定tag号的commitid也类似
```bash
git rev-parse <tag>
```
添加--short参数可以只查看开头几位
