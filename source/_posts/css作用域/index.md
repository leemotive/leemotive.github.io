---
title: css作用域
author: 柚子816
toc: true
comment: true
date: 2023-12-08 11:35:04
tags:
  - css
  - scope
category: 前端
cover: ./cover.jpg
---



说到 css 作用域，大部分情况下都是通过构建工具来实现的，在vue 项目中就 style 标签上添加 `scoped` 属性，剩余的就交给打包工具就行了，面在 react 项目中也可以通过配置 webpack，然后通过 `import style from './index.less'` 这类语法导入样式文件，并从导入的 style 对象中获取添获取经过构建工具处理过的类名，然而这些都是需要经过构建工具处理才可以实现的。



## 语法

原生css增加了新的语法来实现作用域，基本语法如下

```css
@scope [(<scope-start>)]? [to (<scope-end>)]? {
  <rule-list>
}
```

`<rule-list>` 部分就是正常的 css 样式，在 `scope-start` 是一个选择器，表示这些 css 样式需要在 scope-start 所对应的元素内，从面达到限制样式范围的目的。而 `scope-end` 部分则是要在作用域内排除掉部分区域



## 用法

```html
<div class="item">
  <input />
</div>
<input />
```

```css
@scope (.item) {
  input {
    border: 1px solid red;
  }
}
```

这样输 `.item` 内部的输入框将会显示红色边框，而外部的输入框不会受到任何影响



如果仅是这样，那和直接写下面这段 css 代码其实也没有多大差别（在计算选择器优先级的时候有差别，不展开）

```css
.item input {
  border: 1px solid red;
} 
```

也是能限制啊只在  `.item` 内部的输入框展现红色边框。尤其是现在原生 css 也支持嵌套了，在写法上都可以理像了。这时就要看 @scope 里面的 scope-end 了。请看下面这个需求



因为组件嵌套产生了下面这样的 dom 结构

```html
<div class="item active">
  <input />
  <!-- 下面这个 item 是组件嵌套产生的 -->
  <div class="item">
    <input />
  </div>
</div>
```

如果还使用

```css
.active input {
  border: 1px solid red;
}
```

将会导致内嵌组件的输入框也是红色的。然而内嵌的组件并没有`.active` 这个样式，并不希望子组件内部的输入框也变红。这时候就需要这个新的 css作用域语法了

```css
@scope (.active) to (.item) {
  input {
    border: 1px solid red;
  }
}
```

这个 css 就限制了 input 框架需要在 .active 内，但是不能.item 内(不考虑 .active 同级的那个 item 类)

> 如果不使用这个 scope 语法，还有别的方式么，有的话请留下你的方案吧



## ：scope

再看下面这个例子

```html
<div class="before">
  <div class="item active">
    <input />
    <!-- 下面这个 item 是组件嵌套产生的 -->
    <div class="item">
      <input />
    </div>
  </div>
</div>
<div class="after">
  <div class="item active">
    <input />
    <!-- 下面这个 item 是组件嵌套产生的 -->
    <div class="item">
      <input />
    </div>
  </div>
</div>
```

还使用上面的 css

```css
@scope (.active) to (.item) {
  input {
    border: 1px solid red;
  }
}
```

此时如果希望在排除 .item 区域的时候限制只有在整体作用域出现在 .after 内的时候才排除  .item  像上面的出现 在 before 内的时候不作排除又该如何呢。这时就需要用到 `:scope` 这个伪类了

```css
@scope (.active) to (.after :scope .item) {
  input {
    border: 1px solid red;
  }
}
```

如果不加`:scope` 而只写 `.after .item` 的话，浏览器会把这个选择器限制在作用域 `.active` 内而无法超出这个区域







