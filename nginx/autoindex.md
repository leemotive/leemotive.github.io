# autoindex
开启nginx遍历目录的功能，做一个简单的静态文件服务器
```nginx
server {
    listen 80;
    server_name ued.leeup.top;

    root /Users/leemotive/ued;
    index index.htm index.html;

    access_log off;

    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
    charset utf-8;
}
```

> 注意目录的访问权限问题
