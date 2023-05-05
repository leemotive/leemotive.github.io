---
title: "工作中我常用的git命令简记"
author: 柚子816
toc: true
comment: true
date: 2016-09-16 20:01:00
tags: 
  - git
keywrods:
  - 常用命令
category: 工具
cover: ./a6930ab7-7bc3-4fef-9af9-8ede9cde0520.jpeg
---

工作常用的一些git命令简单记录


​    
```bash
git log
```

历次提交的日志


​    
```bash
git reflog
```

查看分支的操作记录，包括删除的操作记录


​    
```bash
git branch
```

显示本地分支名


​    
```bash
git branch -r
```

显示所有远程分支名


​    
```bash
git branch -a
```

显示所有分支名，包括本地和远程分支


​    
```bash
git branch -vv
```

显示本地和远程分支的跟踪关系


​    
```bash
git branch --set-upstream-to=origin/branchName branchName
```

将本地分支和远程分支建立追踪关系


​    
```bash
git remote -v
```

显示本地仓库对应的远程仓库及其地址


​    
```bash
git branch -d branchName
```

删除本地分支，但如果些分支还没有被merge，是无法删除的，如果想要强行删除，可以用下面的命令


​    
```bash
git branch -D branchName
```

删除本地分支


​    
```bash
git push origin :branchName
```

删除远程分支


​    
```bash
git tag tagName commitid
```

对指定的commit进行打标签，commitid可以省略，对当前commit打标签。还有-a，-m等参数


​    
```bash
git tag -d tagName
```

删除本地tag


​    
```bash
git push origin :refs/tags/tagName
```

删除远程tag


​    
```bash
git show-ref
```

显示所有本地的引用


​    
```bash
git show-ref --tag
```

显示所有本地的tag引用


​    
```bash
git reset --hard commitid
```

将HEAD移向指定的commitid，如果此时又想恢复到最新的HEAD，此时用git log又看不到当时最新的commitid，这个时候可以用git
reglog查看


​    
```bash
git stash
```

暂存当前工作区的内容，压入到git栈中，需要临时切换到另一个分支的时候，有时不提交当前修改的时候，无法切换分支，此时可以用stash命令暂存，然后就可以切换分支了。完了之后可以用
git stash apply恢复并且git stash drop丢弃掉暂存的内容取消之前的暂存。相关的命令还有

git stash list 列出git栈中所有的备份

git stash pop 取栈顶备份，并从栈顶移除

git stash clear 清空git栈


​    
```bash
git config
```

作一些常用的git配置

我常用的配置有如下

git config --global user.name myName ##配置用户名

git config --global user.email myEmail ##配置邮件地址

git config --global alias.st status ##配置一些常用的别名

自己的git配置文件常用如下


​    
```ini
[alias]
        st = status
        co = checkout
        cb = checkout -b
        ci = commit
        cm = commit -m
        cam = commit -am
        df = diff
        br = branch
        rt = remote
        pl = pull
        ps = push
        po = push origin
        pou = push -u origin
        mg = merge
        cg = config --global
        cge = config --global -e
        cgl = config --global --list
[color]
        status = true
[push]
        default = simple
```

   

​    

```bash
git mv -f fileName FileName
```

我是windows中开发的，默认是文件名大小写不敏感的，如果想要改文件名大小写可以用上面这个命令，然后commit


​    
```bash
git remote prune
```

在开发过程中，如果某一个分支被别人删除并推送到服务端，那在自己的本地仓库中这个分支还是在的，通过git remote -r
可以看到这个分支名依然存在，此时就可以通过这个命令来清理一些远端已经不存在的分支

git remote prune origin，可以使用git remote show origin 来查看各个分支的状态

