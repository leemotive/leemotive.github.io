# 碎片知识

1. 在try或者catch中return，finally中语句依然会执行，如果在finally中return会用finally中的return;
在finally中修改try或catch中return的变量,类似函数参数,值和引用的关系
```javascript
function f () {
  var k = {b: 0};
  try {
    return k;
  } catch(e) {
  } finally {
    // k = 89; // 返回{b: 0}  
    // k.b = 9; // 返回{b: 9}
  }
}
f();
```

2. querySelectorAll方法返回的是NodeList
3. getElementsByTagName等方法返回的是HTMLCollection
4. form表单中只有一个input的时候，回车会触发表单提交，两个及以上字段不会触发自动提交
5. 使用Promise时在reject和resolve方法后还是调用一下return吧。在reject和resolve方法之后虽然不无法修改状态了，但是却可以修改返回的数据的内容，和finally里面修改返回值类似
