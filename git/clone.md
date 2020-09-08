# clone

通常clone仓库的时候，下载下来的是master分支。如果需要clone指定分支需要 `-b` 参数

```bash
git clone -b develop url
```



在使用 `http` 开头的url作为仓库地址的时候，在克隆的时候会需要输入用户名密码，在一些自动化脚本中可能不方便进行这种交互，可以把用户名密码写进url中

```bash
git clone https://用户名:密码@git.weixin.qq.com/example/example.git
```

