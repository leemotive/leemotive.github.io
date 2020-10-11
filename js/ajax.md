# AJAX

异步请求

之前在写服务端代码的时候，为了判断一个请求是否是 ajax 请求，使用了 header 中的 X-Requested-With 是否是 XMLHttpRequest 来判断，可是后来才发现这个方法只在使用 jQuery 的 ajax 方法发送的请求才生效。也就是说 XMLHttpRequest 是不会添加这个头的，这个头是由 jQuery 库实现的时候添加进行的，所以在自己公司的代码里，也可以在封装请求的时候添加一个一个这样的头部



## XMLHttpRequest



构建实例对象 `new XMLHttpRequest()` , 不需要参数

open方法初始化构建出来的实例对象，语法如下

> open(method, url[, async[, user[, password]]])*

第三个参数为 `async` 表示这个请求是否要使用异步方式，默认为 `true` ，设置为 `false` 会使用请求同步执行，阻塞页面渲染，有此浏览器在主线程上弃用同步，在 `axios` 里面也屏蔽了这个参数



setRequestHeader方法用于设置请求头，语法如下

> *setRequestHeader(name, value)*



timeout属性用于设置请求的过期时间, 同步请求不要设置这个属性，否则会报错



withCredentials属性用于指示在请求跨域的时候，请求是否带有相关授权的信息，以及响应中的cookie是否有效，

> Credentials are HTTP cookies, TLS client certificates, and [authentication entries](https://fetch.spec.whatwg.org/#authentication-entry) (for HTTP authentication)



upload属性返回一个 XMLHttpRequestUpload 对象，可以通过这个对象获取上传文件的相关信息，比如上传进度等



send方法用于将请求发送出去，语法如下

> *send(body)*

参数body为请求的请求体部分，默认为null

 

abort方法可以在请求发送出去之后取消请求，不会触发 [`readystatechange`](https://xhr.spec.whatwg.org/#event-xhr-readystatechange) 事件





| 状态名             | 状态值                               | 状态描述                                                     |
| ------------------ | ------------------------------------ | ------------------------------------------------------------ |
| *unsent*           | `UNSENT` (numeric value 0)           | The object has been constructed.                             |
| *opened*           | `OPENED` (numeric value 1)           | The [`open()`](https://xhr.spec.whatwg.org/#dom-xmlhttprequest-open) method has been successfully invoked. During this state request headers can be set using [`setRequestHeader()`](https://xhr.spec.whatwg.org/#dom-xmlhttprequest-setrequestheader) and the fetch can be initiated using the [`send()`](https://xhr.spec.whatwg.org/#dom-xmlhttprequest-send) method. |
| *headers received* | `HEADERS_RECEIVED` (numeric value 2) | All redirects (if any) have been followed and all headers of a response have been received. |
| *loading*          | `LOADING` (numeric value 3)          | The response body is being received.                         |
| *done*             | `DONE` (numeric value 4)             | The data transfer has been completed or something went wrong during the transfer (e.g., infinite redirects). |



responseURL 在请求被重定向之后，返回最后一次请求的url

status返回此次请求的状态码

getResponseHeader可以从响应里面获取指定的header

getAllResponseHeaders从响应里面获取所有的header信息

responseType可以用来手动设置响应类型，在send方法之前调用，设置的值和服务端的响应内容需要相兼容，否则数据会变成null

response 用来获取请求体

responseText 以文本形式获取请求体

responseXML 以xml文档形式获取请求体

