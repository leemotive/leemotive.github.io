# reset

- `git reset`
仅用HEAD指向的目录树重置暂存区，工作区不受影响。相当于将之前用`git add`命令更新到暂存区的内容撤消

- `git reset -- filename`
效果和`git reset`差不多，只是针对这个特定的文件而已

- `git reset --soft HEAD^`
工作区和暂存区不改变，但是引用向前回退一次，

- `git reset --mixed HEAD^`
工作区不改变，暂存区会回退到上一次提交，引用也会回退一次

- `git reset --hard HEAD^`
彻底撤消最近的提交，引用回退到上一次，而且工作区和暂存区都会回退到上一次提交状态
