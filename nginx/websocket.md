# websocket

nginx配置websocket的代理

```nginx
{
  server {
    ...
    location /ws/ {
      proxy_pass http://backend;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
    }
  }
}
```
