# root和alias
nginx配置文件中root和alias用法类似，有点区别

### root
官网文档作如下说明
```ini
Syntax:	root path;
Default:	root html;
Context:	http, server, location, if in location
```

Sets the root directory for requests. For example, with the following configuration
```nginx
location /i/ {  
    root /data/w3;  
}
```

The /data/w3/i/top.gif file will be sent in response to the “/i/top.gif” request.

The path value can contain variables, except $document_root and $realpath_root.


### alias
```ini
Syntax:	alias path;
Default:	—
Context:	location
```

Defines a replacement for the specified location. For example, with the following configuration
```nginx
location /i/ {  
    alias /data/w3/images/;  
}
```

on request of “/i/top.gif”, the file /data/w3/images/top.gif will be sent.

The path value can contain variables, except `$document_root` and `$realpath_root`.

If alias is used inside a location defined with a regular expression then such regular expression should contain captures and alias should refer to these captures (0.7.40), for example:

```nginx
location ~ ^/users/(.+\.(?:gif|jpe?g|png))$ {  
    alias /data/w3/images/$1;  
}
```

