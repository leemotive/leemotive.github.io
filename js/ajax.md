# AJAX

异步请求

之前在写服务端代码的时候，为了判断一个请求是否是 ajax 请求，使用了 header 中的 X-Requested-With 是否是 XMLHttpRequest 来判断，可是后来才发现这个方法只在使用 jQuery 的 ajax 方法发送的请求才生效。也就是说 XMLHttpRequest 是不会添加这个头的，这个头是由 jQuery 库实现的时候添加进行的
