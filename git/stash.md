# stash

`git stash`的作用是把当前修改的文件内容暂存起来，这样可以获取一个干净无修改的分支，方便临时做一些其他的工作，然后再重新恢复之前修改的内容继续工作

- `git stash` 暂存内容
- `git stash -k` 暂存内容时不会包含已经处于staged状态的内容
- `git stash list` 查看暂存的列表
- `git stash apply` 将最近一次暂存的内容恢复
- `git stash apply --index` 暂存时如果文件处于staged状态，通过此命令恢复，可以恢复到staged状态
- `git stash pop` 恢复暂存的内容，同时删除记录
- `git stash drop` 从暂存列表中删除记录
- `git stash clear` 清空暂存列表
- `git stash push [path]` 只暂存指定的文件
- `git stash -a` 所有新文件及被忽略的文件也会暂存
- `git stash -u` 所有新文件不含忽略文件会被暂存

暂存时可以添加-m的属性，为此次暂存添加一个说明。和commit命令类似

