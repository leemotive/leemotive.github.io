# cookie

通过浏览器存储在电脑里的一个文件，访问某个网站时，会自动携带为该网站创建的cookie
```javascript
document.cookie
"__utmz=52521148.1580459824.8.3.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utma=52521148.1485581966.1577766889.1581950460.1582298383.18; __utmc=52521148"
```
键值对结构，每个cookie中间采用逗号加空格分割，这也是解析cookie的时候切分cookie的规则，设置cookie时不要在键或值里面使用分号，逗号，等号及空格。

- 存储量有限
- 安全性不高
- 浏览器可以设置禁用cookie
- cookie也有跨域问题，不同域的cookie不共享（端口不同没影响，在没有secure限制时http和https也没有影响）
- 只有name=value会随着请求发送服务端，其它限制属性不会发送，只用来计算哪些cookie要被发送

## 设置cookie
```javascript
document.cookie = 'name=value;domain=domain;path=path;expires=time;max-age=num;SameSite=level;HttpOnly;secure'
```

- name=value
    
    设置cookie名称及对应的值
    
- domain=domain
    
    设置cookie在哪个域名下生效，默认是当前页面对应的域名，可以自己指定为当前域名的父级域名
    
    ```javascript
    // http://page.example.com/a.html
    document.cookie = 'name=张三;domain=example.com';
    ```
    自己指定域名的时候会在域名前自动补上一个 `.`。表示域名在domain及其子域均可以被访问
    
- path=path
    
    设置cookie在哪个路径下可以被访问
    
    - 绝对路径
    - path或者其子目录下才可以访问
    - 默认是当前页面所有目录
    - 如果设置成了别的目录(非父目录)，那当前目录也是访问不到的
    
- expires=time
    
    设置cookie过期时间
    
    - 表示一个时间点的字符串
    - 通过`new Date()`创建日期并调用`toUTCString`方法转为字符串
    - 不要使用Date隐工转为字符串功能，不同浏览器实现不一定是一样的
    - 到过了过期时间后cookie会自动删除
    - 设置expires为当前时间或者之前的时间来手动删除
    
- max-age=num
    
    设置cookie过期时间
    
    - 单位是秒
    - 比expires新，优先级也比expires高，和http缓存中的max-age和expires类似
    - 低版本的IE有兼容性问题，expires基本没这个问题
    
- SameSite=level
    
    用于限制第三方cookie，其值可以是Strict,Lax,None
    
    - Strict 禁用任何第三方Cookie
    - Lax 
        - 对于第三方异步请求，禁止第三方cookie(包括script, link, img, iframe)
        - 对于第三方同步GET请求，不禁止第三方cookie(包括超链接，link预加载，Get型form表单)
    - None 没有任何限制
        
        > Chrome浏览器后续版本可能会要求在设置SameSite=Node的时候，同时要求设置secure。否则不生效
    
- HttpOnly
    
    规定cookie只能在http(s)请求中访问，防止通过脚本获取。也不可以在前端设置设置属性，带有此忏悔的cookie设置都是生效的，只能通过服务端来设置
    
- secure
    
    cookie只能在https协议下才会发送到服务端
    
    也只可以在https网站下设置些属性

