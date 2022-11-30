# 跳过 merge-commit

如果想要在 pre-commit 中只针对普通commit 做一些校验，而放过 merge 并且有冲突之后中的 commit。这就是需要在 pre-commit 中判断本次 commit 是不是在 merge 之后并且还没有 commit



可以通过 `git merge HEAD` 命令来测试

如果当前处理 merge 后有冲突的情况，此命令执行失败。否则命令执行成功，对项目也没有什么影响。



如果是结合了 husky 使用的。那么 `git merge HEAD` 这个命令在失败之后，会立即中止 commit 操作，所以需要做些额外处理

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

{
  git merge HEAD &> /dev/null
} || {
  echo "merge 之后中的 commit"
  exit 0
}

echo "一般情况的 commit"
npx lint-staged
```

