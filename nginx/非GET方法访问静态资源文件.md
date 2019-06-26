# 非GET方法访问静态资源文件

把nginx作为静态资源服务器来使用还是很好用的，大部分情况都GET请求，如果是post请求，则会出现访问失败，可通过nginx配置的方式解决

```
server {
    listen 10920;
    server_name localhost;

    root /Users/leemotive/charles-mock;

    location ~ .*\.json$ {
        if ($request_method !~* "GET") {
            rewrite .* http://$host:$server_port$request_uri;
        }
    }
}
```

对post请求json作转化，强制重写为Get请求
