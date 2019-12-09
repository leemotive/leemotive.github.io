# centos7

[参考链接](http://www.ailophy.com/2018/07/14/vpn/)

## 安装ShadowSocks
`yum install python-setuptools && easy_install pip`

`pip install shadowsocks`

## shadowsocks配置文件
/etc/shadowsocks.json

单用户配置
```javascript
{ 
  "server": "xxx.xxx.xxx.xxx",  // 这里填写你的服务器的IP地址
  "server_port": 8234,          // 这是填自定义的shadowsocks的端口，如 7777 或 8234等等，但要避免使用常用端口如：80，3306，3389，21，20等。
  "local_address": "127.0.0.1", // 默认填写127.0.0.1即可 
  "local_port": 1080,           // 默认填写1080即可 
  "password": "********",       // ***为自定义的密码
  "timeout": 300,               // 超时300秒
  "method": "aes-256-cfb",      // 加密方式 aes-256-cfb
  "fast_open": false 
}
```

多用户配置
```javascript
{ 
  "server": "xxx.xxx.xxx.xxx", // 这里填写你的服务器的IP地址
  "port_password": {
    "8234": "*********",       // 为8234端口设定自定义的密码
    "8235": "*********",       // 为8235端口设定自定义的密码
    "8236": "*********"        // 为8236端口设定自定义的密码，如果还需要多个账号，按此格式往下添加即可，但要保证最后一个账户后面没","切记！
  },
  "timeout": 300,
  "method": "aes-256-cfb",
  "fast_open": false
}
```

## firewall开放端口
查看防火墙状态
`firewall-cmd --state`

打开防火墙
`systemctl start firewall`

开放端口
`firewall-cmd --zone=public --add-port=1234/tcp --permanent`

重启防火墙
`firewall-cmd --reload`

查看已开放的端口
`firewall-cmd --list-ports`


## 启用Shadowsocks服务
`ssserver -c /etc/shadowsocks.json -d start`

前台运行
`ssserver -c /etc/shadowsocks.json`

后台运行

启动 `ssserver -c /etc/shadowsocks.json -d start`

停止 `ssserver -c /etc/shadowsocks.json -d stop`

## 安装serverspeeder加速
`wget -N --no-check-certificate https://github.com/91yun/serverspeeder/raw/master/serverspeeder.sh && bash serverspeeder.sh`

如果需要更换内核
`rpm -ivh http://soft.91yun.org/ISO/Linux/CentOS/kernel/kernel-3.10.0-229.1.2.el7.x86_64.rpm --force`

如果需要更换键盘布局
`localectl set-keymap gb`

如果提示The name of network interface is not eth0, please retry after changing the name。

执行以下命令
`yum install net-tools -y`

ServerSpeeder常用命令
```
service serverSpeeder start #启动
service serverSpeeder stop #停止
service serverSpeeder reload #重新加载配置
service serverSpeeder restart #重启
service serverSpeeder status #状态
service serverSpeeder stats #统计
service serverSpeeder renewLic #更新许可文件
service serverSpeeder update #更新
chattr -i /serverspeeder/etc/apx* && /serverspeeder/bin/serverSpeeder.sh uninstall -f #卸载
```

