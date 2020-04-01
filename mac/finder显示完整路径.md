# finder显示完整路径

```shell
$ defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
# 恢复默认状态
$ defaults delete com.apple.finder _FXShowPosixPathInTitle
```
