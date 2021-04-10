# dns

公司内搭建dns服务器

参考链接

[DNS服务器搭建与配置](https://cshihong.github.io/2018/10/15/DNS%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA%E4%B8%8E%E9%85%8D%E7%BD%AE/)

[详解 linux 下的DNS配置过程及原理参数](https://blog.51cto.com/linuxnx/1169567)

### 主要修改点  
named.conf文件中的`listen-on`和`allow-query`需要设置为`any;`  

在zone文件中用*来代表所有子域名

