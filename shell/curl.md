# curl
这是个很有用的命令，调试的查问题的时候应该会经常用到的，平常常用的也就是`curl leeup.top`这样的方式，以get方式直接请求一个地址

但是还有三种常见的需求

#### 设置其它请求方式
通过-X参数设置
```
location / {
  echo "$request_method";
}
```
用以上的nginx配置来验证一下
```
$ curl -X POST localhost:10920
POST
```
那如何传送数据呢，通过-d属性
```
location / {
  echo_read_request_body;
  echo "$request_method $request_body";
}
```
```
$ curl -X POST -d "name=leeup" localhost:10920
POST name=leeup
```

#### 添加Header
通过-H添加
```
location / {
  echo_read_request_body;
  echo "$http_token";
}
```
请求如下
```
$ curl -H "token:yuweyas" localhost:10920
yuweyas
```
可以多次使用-H来添加多个header

#### 添加cookie
有些请求需要携带cookie来可以正常返回，通过--cookie来添加cookie
```
location / {
  echo "$cookie_uuid";
}
```
请求如下
```
$ curl --cookie "uuid=782374734653583945" localhost:10920 
782374734653583945
```
多个cookie使用分号分隔如
```
$ curl  "localhost:10920" --cookie "aa=345345;uuid=23424234"       
23424234
```
