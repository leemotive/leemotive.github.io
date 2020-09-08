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

6. 循环使用Index

   ```js
   new Array(10).forEach((item, index) => {}); // 不会进行循环遍历
   [...new Array(10)].forEach((item, index) => {}) // 遍历的每一项都 undefined
   ```

   通过这种方法初始化的数组，元素是不存在的，在控制台打印看到的是 `empty`，这些元素在 `every, filter, forEach, map, some` 的循环中也是被跳过的
   
7. null > 0 和 null == 0都是false, 但是 null >=0 却是 true
