---
title: "angular中自定义指令时的scope中属性的绑定策略"
author: 柚子816
toc: true
comment: true
date: 2015-12-20 21:32:00
tags: 
  - angular
keywords:
  - directive
  - scope
  - "&"
  - 传参
category: 前端
cover: 
---

在angular中自定时，scope可以设置为true, false(默认值), 一个对象。

1\. 默认值false时，指令的作用域就是指令元素所在的作用域

2\. 设置为true时，指令的作用域是从元素所在的作用域继承来的新作用域

3\. 设置为一个对象时，产生一个隔离的作用域。

在使用隔离作用域的时候，属性有 = @ & 三种绑定策略


​    
```javascript
scope: {
    name: '=',
    age:'@',
    gen: '&'
}
```

用 = 的时候，将本地属性name和指令元素所在作用域的属性进行双向绑定

用 @ 的时候，将本地属性agek和指令元素上的属性进行绑定

用 & 的时候，指令元素上的gen需要是个函数，作为回调函数

给个例子


​    
```html
<div ng-controller="MyController">
    name: <input type="text" ng-model="name" /><br>
    age: <input type="text" ng-model="age"> <br>
    <div id="dir" my-directive name="name" age="{{age}}" gen="gen(h,s)"></div>
</div>
<script>
    app.controller('MyController', function($scope){
        $scope.gen = function (){
            console.log('------', arguments)
        }
    })
    app.directive('myDirective', function(){
        return {
            restrict: 'A',
            scope: {
                name: '=',
                age:'@',
                gen: '&'
            },
            template: '<div><hr/>name:<input type="text" ng-model="name" /><br>age:<
input type="text" ng-model="age" /><br><input type="button"  
value="click me" ng-click="clo()" /></div>',
            link: function ($scope){
                $scope.clo = function () {
                    //注意传参方式
                    $scope.gen({s:123, h:564});
                }
            }
        };
    })
</script>
```

以上是部分代码， ng-app部分没有给出

