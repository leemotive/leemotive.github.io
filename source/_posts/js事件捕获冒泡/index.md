---
title: "js事件捕获冒泡"
author: 柚子816
toc: true
comment: true
date: 2014-10-22 21:44:00
tags: 
  - JavaScript
keywords:
  - 事件
  - 捕获
  - 冒泡
category: 前端
cover: 
---

浏览器在发生一个事件时会从经过顶层到目标的捕获过程，目标到顶层的冒泡过程，不多解释，看代码理解


​    
```html
<html>
  <head>
    <style>
        #outer{
            width: 200px;
            height: 200px;
            background: #F08738;
        }
        #mid{
            width: 150px;
            height: 150px;
            background: #293484;
        }
        #inner{
            width: 100px;
            height: 100px;
            background: #783948;
        }
        #target{
            width: 50px;
            height: 50px;
            background: #98fe99;
        }
    </style>
  </head>  
  <body>
    <div id="outer">
      <div id="mid">
        <div id="inner">
            <div id="target"></div>
        </div>
      </div>
    </div>
    <script>
        var o = document.getElementById('outer');
        var m = document.getElementById('mid');
        var i = document.getElementById('inner');
        var t = document.getElementById('target');
    </script>
  </body>
</html>
```

![](./b13c393a-ea7f-3b11-a282-7a7abc1a9367.png)  
四个div层次很清楚

下面为div绑定事件


​    
```js
o.addEventListener('click', function(){console.log('outer')});
m.addEventListener('click', function(){console.log('mid')});
i.addEventListener('click', function(){console.log('inner')});
t.addEventListener('click', function(){console.log('target')});
```

点击target的结果如下，依次输出target inner mid outer

冒泡的结果，点击target, 它父层的div的click事件也会执行

再看捕获阶段


​    
```js
o.addEventListener('click', function(){console.log('outer')}, true);
m.addEventListener('click', function(){console.log('mid')}, true);
i.addEventListener('click', function(){console.log('inner')}, true);
t.addEventListener('click', function(){console.log('target')}, true);
```

addEventListener最后加了个参数，指明此事件在捕获阶段执行，其结果是 outer mid inner target

可以看出来从顶层到目标元素的捕获阶段

捕获，冒泡一起绑定


​    
```js
o.addEventListener('click', function(){console.log('outer bubble')}, false);
o.addEventListener('click', function(){console.log('outer')}, true);
m.addEventListener('click', function(){console.log('mid bubble')}, false);
m.addEventListener('click', function(){console.log('mid')}, true);
i.addEventListener('click', function(){console.log('inner bubble')}, false);
i.addEventListener('click', function(){console.log('inner')}, true);
t.addEventListener('click', function(){console.log('target bubble')}, false);
t.addEventListener('click', function(){console.log('target')}, true);
```

点击target结果是

outer

mid

inner

target bubble

target

inner bubble

mid bubble

outer bubble

可以看到先是执行捕获阶段的函数，然后是冒泡阶段的函数

对于目标元素target没有捕获冒泡区分，指定冒泡阶段的函数在指定捕获阶段的函数先执行了。执行顺序不确定

