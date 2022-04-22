# git 安装

环境

- Centos 7
- git version 2.30.0
- 从源码编译安装



提示 `git: 'remote-https' is not a git command. See 'git --help'.`

通过 yum 安装 `libcurl-devel` 后，重新编译安装 git 可解决问题



或者先执行

```bash
yum install https://packages.endpointdev.com/rhel/7/os/x86_64/endpoint-repo.x86_64.rpm
```

然后再通过 `yum` 安装 git 就可以安装到相对新一些的git版本
