在css中有几个选择元素位置的伪类选择符

- first-child  
 
 元素必须是某个元素的第一个子元素，文本节点及注释节点不影响
 
- last-child 
 
 和first-child类似，这里选择的是最后一个子节点
 
- only-child 
 
 元素必须是唯一的子元素。同样文本节点和注释节点不影响
 
- nth-child(n) 
 
 元素必须是父元素的第n个子元素。从1开始
 
- nth-child(2n) 
 
 表示第偶数位置的子元素。同理还有2n-1, 3n, 3n-1, 3n-2......
 
- nth-last-child(n) 
 
 和nth-child类似，这里是反向的
 
- first-of-type 
 
 匹配父元素下第一个类型的元素。如p:first-of-type, 表示匹配某个元素下第一个p元素
 
- last-of-type 
 
 类似first-of-type，这里的反向的
 
- only-of-type 
 
 匹配唯一的某类型的元素
 
- nth-of-type(n) 
 
 匹配第n个某类型的元素， nth-child是在所有子元素中定位，这里只是在某类型的元素中去定位
 
- nth-last-of-type 
 
 和nth-of-type类似，这里是反向的

 

```html
<body>
  <div class="text">This is first div</div>
  <span class="text">This is first span</span>
</body>
```
```css
.text:first-of-type {
  color: gold;
}
```

这段代码里`.text`会匹配到div和span。同时这两个元素在兄弟节点中又分别是第一个div和第一个span,所以div和span都会变成金色


如果对html稍作修改
```html
<body>
  <div class="text">This is first div</div>
  <span>This is first span</span>
  <span class="text">This is second span</span>
</body>
```
这个时候匹配到的span不再是第一个span。所以只有div会变成金色
