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
