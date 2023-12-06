---
title: "margin设置百分比"
author: 柚子816
toc: true
comment: true
date: 2015-07-19 00:17:00
tags: 
  - css
keywords:
  - margin
  - 百分比
category: 前端
cover: 
---

margin，元素的外边距，规定了元素与元素之间的间距，一直以来都是这么用的

margin: 10px 20px 15px 30px; 定义上右下左的边距

margin:0 auto; 定义居中

直到最近发现它和width,height什么的属性一样，也可以设置百分比。那这个百分比是相对谁的呢？


​    
```html
<!doctype html>
<html lang="en">
	<head>
		<title>Document</title>
		<style>
			.container{
				width: 500px;
				height: 300px;
				border: 1px solid red;
				margin: 30px auto;
			}
			.content{
				width: 100px;
				height: 50px;
				border: 1px solid blue;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="content"></div>
		</div>
	</body>
</html>
```


效果如下

![](./8c82e785-1e6c-35e7-afd2-2e71e4305367.png)

  蓝色div没加margin属性，现在加上margin属性看看效果：margin-left: 50%;

![](./da78b428-4ea7-3b4b-9df1-0de53d4824e5.png)

显然左边距是父元素宽度的50%

现在尝试margin-top: 50%;  

![](./c4652d84-6ca1-3a71-8820-5efafd902dbb.png)



显然上边距的距离依然是父元素宽度的50%;

也就是说百分比是相对父元素的宽而言的，不管水平方向还是垂直方向。

那如何让其相对父元素的高度来计算呢

给父元素加上 -webkit-writing-mode: vertical-lr;更改其书写方向，关于writing-mode的用法，这里不作叙述，有兴趣参照[css参考手册](http://css.doyoe.com/)中 “属性” -> “书写模式”  

![](./8dc2967f-597b-3150-8fbc-1d384e932576.png)

明显，此时百分比是按照父元素高度来计算的，只是此时父元素的书写模式已改为竖直方向。

  

