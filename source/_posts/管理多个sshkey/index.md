---
title: "管理多个sshkey"
author: 柚子816
toc: true
comment: true
date: 2016-01-10 14:43:00
tags: 
  - ssh
keywords:
  - 多个sshkey
category: 工具
cover: 
---

工作中经常会需要通过ssh来连接远程服务器

ssh lee@196.168.56.1022

然后输入密码成功登录。或者用git来管理我们的代码

但每次都这样未免太麻烦，所以用到了sshkey,通过公私密钥对来做身验证。这样就很方便。一般而言，一个key就包打天下了。id_rsa
和id_rsa.pub就可以了

但是其实我们也可以通过配置，在访问不同的域的时候用不同的key

进入 .ssh目录，在你用户目录下

比如说我要实现github, bitbucket用不同的sshkey

先生成github的key


​    
```bash
ssh-keygen -f id_rsa_github
```

这样会在.ssh目录下生成 id_rsa_github（私钥）和 id_rsa_github.pub（公钥）两个文件

同样


​    
```bash
ssh-keygen -f id_rsa_bitbucket
```

生成bitbucket用的公私钥

接下来，要写配置文件了

创建文件 config （此文件就叫config，不用后缀名）


​    
```ini
Host  github.com  
    HostName    github.com  
    IdentityFile ~/.ssh/id_rsa_github  
  
# bitbucket  
Host bitbucket.org  
    HostName bitbucket.org  
    IdentityFile ~/.ssh/id_rsa_bitbucket  
```

注意这里面的配置如果是git管理我们的代码使用的 Host 后面的内容不要随便写，一定要和HostName填写一样域名

这时再使用 git clone git@github.com:***的时候，会使用id_rsa_github密钥

当然使用 git clone git@bitbucket.org:*** 的时候，自然用的就是id_rsa_bitbucket密钥

以上是在windows中的，如果是在linux中，配置写法都一样，但是好像config文件的 IdentityFile名字和实际文件名字不一样也可以git
clone代码（测试bitbucket的时候），很是郁闷，按理说不应该啊，一直没搞懂。

