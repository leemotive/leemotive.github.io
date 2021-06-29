# setTimeout

> var timeoutID = scope.setTimeout(function[, delay, arg1, arg2, ...]);  
> var timeoutID = scope.setTimeout(function[, delay]);  
> var timeoutID = scope.setTimeout(code[, delay]);  

在第一个参数是函数的情况下，后面可以有多个可选参数，在回调函数执行时传递给回调函数



delay参数设置有最大值限制，该值为2147483647，超过这个时间会被自动设置为1，导致瞬间就执行了回调方法

