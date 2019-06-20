# 安装echo

nginx默认没有echo模块，需要自己通过源码编译安装，并添加echo模块，

下载[nginx源码包](http://nginx.org/download/)请选择一个版本下载  
下载[echo模块源码](https://github.com/openresty/echo-nginx-module/archive/v0.61.tar.gz)  
分别解包


如果已经安装过nginx了，可以通过`nginx -V`查看构建参数
```
nginx version: nginx/1.17.0
built by clang 10.0.1 (clang-1001.0.46.4)
built with OpenSSL 1.0.2s  28 May 2019
TLS SNI support enabled
configure arguments: --prefix=/usr/local/Cellar/nginx/1.17.0 --sbin-path=/usr/local/Cellar/nginx/1.17.0/bin/nginx --with-cc-opt='-I/usr/local/opt/pcre/include -I/usr/local/opt/openssl/include' --with-ld-opt='-L/usr/local/opt/pcre/lib -L/usr/local/opt/openssl/lib' --conf-path=/usr/local/etc/nginx/nginx.conf --pid-path=/usr/local/var/run/nginx.pid --lock-path=/usr/local/var/run/nginx.lock --http-client-body-temp-path=/usr/local/var/run/nginx/client_body_temp --http-proxy-temp-path=/usr/local/var/run/nginx/proxy_temp --http-fastcgi-temp-path=/usr/local/var/run/nginx/fastcgi_temp --http-uwsgi-temp-path=/usr/local/var/run/nginx/uwsgi_temp --http-scgi-temp-path=/usr/local/var/run/nginx/scgi_temp --http-log-path=/usr/local/var/log/nginx/access.log --error-log-path=/usr/local/var/log/nginx/error.log --with-compat --with-debug --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_degradation_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-ipv6 --with-mail --with-mail_ssl_module --with-pcre --with-pcre-jit --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module 
```

主要是最后一个configure arguments的内容  


在下载的nginx源码包内执行configure命令
```
./configure --prefix=/usr/local/Cellar/nginx/1.17.0 --sbin-path=/usr/local/Cellar/nginx/1.17.0/bin/nginx --with-cc-opt='-I/usr/local/opt/pcre/include -I/usr/local/opt/openssl/include' --with-ld-opt='-L/usr/local/opt/pcre/lib -L/usr/local/opt/openssl/lib' --conf-path=/usr/local/etc/nginx/nginx.conf --pid-path=/usr/local/var/run/nginx.pid --lock-path=/usr/local/var/run/nginx.lock --http-client-body-temp-path=/usr/local/var/run/nginx/client_body_temp --http-proxy-temp-path=/usr/local/var/run/nginx/proxy_temp --http-fastcgi-temp-path=/usr/local/var/run/nginx/fastcgi_temp --http-uwsgi-temp-path=/usr/local/var/run/nginx/uwsgi_temp --http-scgi-temp-path=/usr/local/var/run/nginx/scgi_temp --http-log-path=/usr/local/var/log/nginx/access.log --error-log-path=/usr/local/var/log/nginx/error.log --with-compat --with-debug --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_degradation_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-ipv6 --with-mail --with-mail_ssl_module --with-pcre --with-pcre-jit --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --add-module=/usr/local/opt/echo-nginx-module-0.61

```

这里除了上面复制下来的参数列表，还在最后加上下面的参数（后面的值是echo模块解包后的路径）
```
--add-module=/usr/local/opt/echo-nginx-module-0.61
```

然后执行
```
make -j2
make install
```

接下来就可以在nginx配置文件使用echo命令了



更多安装内容请参考[Nginx安装echo模块](https://www.cnblogs.com/52fhy/p/10166333.html)
如果在编译过程中提示C编译器cc不存在什么的，我的是mac，在xcode中设置好Command Line Tools就好了
