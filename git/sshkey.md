# sshkey

在添加了 sshkey 之后中仍然不能克隆项目的情况下可以尝试在 ~/.ssh/config 文件中添加配置



```
Host hostname
	HostKeyAlgorithms +ssh-rsa
	PubKeyAcceptedKeyTypes +ssh-rsa
	HostName hostname
	IdentityFile ~/.ssh/filename
```

将 hostname 和 filename 换成对应的域名及文件名