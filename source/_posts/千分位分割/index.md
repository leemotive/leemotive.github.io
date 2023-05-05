---
title: "千分位分割"
author: 柚子816
toc: true
comment: true
date: 2015-12-03 12:08:00
tags: 
  - JavaScript
keywords:
  - 千分位
category: 前端
cover: 
---

格式化数字 67235943 为货币金额显示方式 67，235，943要怎么做，这是暂时不考虑有小数的形式

采用正则替换，调用字符串replace方法


​    
```js
"67235943".replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1,')
```

如果有小数部分，如 67235943.4687 此时如果只格式化整数部分，采用上面的正则，不过要稍微修改


​    
```js
"67235943.26564887".replace(/(\d{1,3})(?=(?:\d{3})+\.)/g, '$1,')
```

如果你还想把小数部分也格式化了（不知道会不会要这样做），用如下正则


​    
```js
"67235943.26564887".replace(/(?:(\d{3})(?=(?:\d{1,3})+$))|(?:(\d{1,3})(?=(?:\d{3})+(?:$|\D)))/g, '$1$2,')
```

上面的几个正则表达式针对不同情况进行格式化，下面是一个function，用来兼容所有情况


​    
```js
function format (input, fmtDecimal){
	if(input){
		return input.split('.').map(function(item, index){
			var formatted = item;
			if(!index) {
				formatted = item.replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1,');
			} else if(fmtDecimal){
				formatted = item.replace(/(\d{3})(?=\d{1,3})/g, '$1,');
			}
			return formatted;
		}).join('.')
	}
}
```

如果哪位高人有其它好方法请指点

