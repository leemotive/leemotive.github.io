# string

## startsWith

这个方法是用来判断一个字符串是否是以另一个字符串开头的, 经常用的方式就是`'hello'.startsWith('he')`, 一直以来都忽略了它的第二个参数`position`,

这个参数是用来指定从哪个位置开始比较，可以简单的理解为`'hello'.slice(position).startsWith()`


## endsWith
这个和startsWith是一样，也有第二个参数`length`,它指定截取前多少个符来作比较


## codePointAt
可以识别原来es5不能识别的大于0xFFFF的码点。对应的静态方法是String.fromCodePoint

## includes
同样是忽略了第二个参数`position`，指定查找子字符串的开始位置

## indexOf
同includes一样有第二个参数`fromIndex`,基本上没怎么用到过。lastIndexof同理有fromIndex

## matchAll
string调用match方法的时候会返回匹配项及捕获分组，如果正则带有g标记，则只返回匹配项，而没有捕获分组的信息。  
matchAll就是用来在有g标记的时候获取更全信息的。matchAll返回一个迭代器。每次调用next返回下一个匹配项及它的捕获分组信息

## search
参数是正则表达式，根据正则表达式查找第一个匹配的字符串的起始位置，没有匹配的返回-1

## split
分割字符串的，也是一直以来忽略了它的第二个参数。它限制返回的分割片段的数量, 多出来的就不会返回了

如果分割符是正则表达式，并且有捕获括号，捕获结果也会出现在结果数组中

```javascript
'abcdefg'.split(/d(e*)/)
// ["abc", "e", "fg"]
```

## String.raw 
模板字符串的标签函数。目前真没用到过
```javascript
String.raw`Hi\n${2+3}!`;
// 'Hi\n5!'，Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script'); 
// 'foo5barJavaScriptbaz'
```
