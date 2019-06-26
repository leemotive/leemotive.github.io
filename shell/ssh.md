# ssh

在连接是出现 ssh_exchange_identification: read: Connection reset by peer  
我这里造成这个错误的原因是在服务器上把我的ip加入到了/etc/hosts.deny文件中了  
登录服务器把/etc/hosts.deny中对应的记录删除就好了  

问题是在重新连接之后，服务器又把我的客户端ip添加到/etc/hosts.deny中了，又无法连接了  
参照[Denyhosts keeps adding my IP address to hosts.deny](https://superuser.com/questions/174162/denyhosts-keeps-adding-my-ip-address-to-hosts-deny)  
结果是不仅要删除/etc/hosts.deny中的记录，在/var/lib/denyhosts目录下的文件里面有关于客户端ip的记录也要删除  
其中hosts-root文件中记录着对应ip输错密码的次数  

### 连接服务器后直接执行一个命令
```bash
$ ssh username@host "command"
```
