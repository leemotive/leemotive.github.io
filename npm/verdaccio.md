# verdaccio

安装完成后，直接通过 verdaccio 启动会占用终端不退出。这时可以通过 `pm2` 来启动项目

```shell
$ pm2 start verdaccio
```



项目启动成功后，可能如果出现在服务器上通过 `localhost` 可以访问，但是通过 ip 却访问不了，需要在 verdaccio 的配置文件内添加配置

```yaml
# 4873 是 verdaccio 使用的端口号
listen: 0.0.0.0:4873
```

