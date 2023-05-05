---
title: "阻止冒泡"
author: 柚子816
toc: true
comment: true
date: 2014-10-22 22:07:00
tags: 
  - JavaScript
keywords:
  - stopPropagation
  - 阻止冒泡
category: 前端
cover: 
---

阻止冒泡，项目中估计也经常会用到，可以用stopPropagation方法或设置cancelBubble


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
        
        o.addEventListener('click', function(){console.log('outer bubble')}, false);
        m.addEventListener('click', function(){console.log('mid bubble')}, false);
        i.addEventListener('click', function(event){
            event.stopPropagation();
            console.log('inner bubble');
        }, false);
        t.addEventListener('click', function(){console.log('target bubble')}, false);
    </script>
  </body>
</html>
```

点击target结果是

target bubble

inner bubble

可以看到只执行了target,
inner两个div的click函数，在inner的click函数中调用了event.stopPropagation();则上层的div的click函数不会再执行了，成功阻止了事件冒泡，如果在ie中，写法是event.cancelBubble
= true

可是后来发现stopPropagation不仅能阻止冒泡，还能阻止捕获，看代码


​    
```js
o.addEventListener('click', function(){console.log('outer bubble')}, false);
o.addEventListener('click', function(){console.log('outer')}, true);
m.addEventListener('click', function(){console.log('mid bubble')}, false);
m.addEventListener('click', function(event){
    console.log('mid');
    event.stopPropagation();
}, true);
i.addEventListener('click', function(){console.log('inner bubble')}, false);
i.addEventListener('click', function(){console.log('inner')}, true);
t.addEventListener('click', function(){console.log('target bubble')}, false);
t.addEventListener('click', function(){console.log('target')}, true);
```

点击target可以看到只显示的outer mid的捕获阶段的click事件，后续inner, target以及冒泡阶段的事件都没有执行。

W3C上对stopPropagation的解释是

“不再派发事件。

终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。”  

