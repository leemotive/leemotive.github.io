# URLSearchParams

哎，这个api已经出来很久啦

```javascript
var k = new URLSearchParams('https://www.baidu.com/s?wd=git%20stash&rsv_spt=1&rsv_iqid=0xab71820e0000fe72&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=10&rsv_sug1=1&rsv_sug7=001&rsv_sug2=0&inputT=1745&rsv_sug4=2422&rsv_sug=9')
for(let a of k) console.log(a)
```
打印出来的参数第一个参数名字是`https://www.baidu.com/s?wd`多了个域名，如果构造函数中没有域名，则可以正常输出
```javascript
var k = new URLSearchParams('?wd=git%20stash&rsv_spt=1&rsv_iqid=0xab71820e0000fe72&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=10&rsv_sug1=1&rsv_sug7=001&rsv_sug2=0&inputT=1745&rsv_sug4=2422&rsv_sug=9')
for(let a of k) console.log(a)
```

如果构造函数中带有域名，也只可以通过URL来做处理
```javascript
var k = new URL('https://www.baidu.com/s?wd=git%20stash&rsv_spt=1&rsv_iqid=0xab71820e0000fe72&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=10&rsv_sug1=1&rsv_sug7=001&rsv_sug2=0&inputT=1745&rsv_sug4=2422&rsv_sug=9')
for(let a of k.searchParams) console.log(a)
```

更多方法及例子参阅[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)



关于 `new URL()` 操作返回的对象拥有的属性的说明：

```js
new URL('http://leemotive:leemotivepwd@example.leemotive.com:7002/package/query?keyword=nanjing#/hashstr')
```

- href

  完整的 url 字符串

- protocal

  协议部分，末尾有 `:`

- host

  域名 + 端口部分，默认端口会被省略

- hostname

  域名部分，没有端口

- port

  端口号

- pathname

  url 中路径部分

- search

  url 中的参数，以 `?` 开头

- hash

  url 中的hash部分，以 `#` 开头

- username

  url 中用户名部分

- password
  url 中密码部分

- origin（只读）

  包含 协议，域名，端口三部分，据此可以判断是否满足同源策略

- searchParams

  一个 URLSearchParams 对象，包含 search 部分的信息

> 如果把 hash 写在前面，参数写在后面，那么返回的 hash 是包含参数部分的，而 search 是一个空字符串

