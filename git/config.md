# 配置

## 配置文件
配置文件采用ini格式编写  
git有三种级别的配置文件，仓库级别，用户级别，系统级别  


- 仓库配置文件(优先级最高)  
  配置仅针对当前仓库 `./.git/config`
```bash
$ git config
```

- 用户配置文件(优先级次之)  
  配置仅针对当前用户 `~/.gitconfig`
```bash
$ git config --global
```

- 系统配置文件(优先级最低)  
  配置对当前系统内所有用户生效 `/etc/gitconfig`(都说是这个文件),我的电脑上却是另外一个文件 `/usr/local/git/etc/gitconfig`
```bash
$ git config --system
```

## 基本语法
git config \<section\>.\<key\> \<value\>


## 配置

- 用户信息，主要标记每次提交的用户信息
```bash
$ git config user.name "Your Name"
$ git config user.email you@example.com
```
如果没有配置就提交内容，也会有相应的提示

- 配置别名
```bash
$ git config alias.cm "commit -m"
```
