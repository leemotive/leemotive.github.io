---
title: 滚动驱动动画
author: 柚子816
toc: true
comment: true
date: 2024-05-27 11:37:28
tags:
  - 滚动驱动
  - 动画
  - css
category: 前端
cover: ./cover.jpeg
---

一直以来，css 动画都是通过时间来控制的，随着时间的推移，页面元素的状态不断的变化。比如下面css 代码，定义了一个动画，在 3s 内元素的 left 属性从 0 变化到 60，并且是线性变化的。

```css
@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: 60px;
  }
}

.ani {
  animation: move 3s linear forwards;
}
```



## 滚动驱动

现在又多了一种选择，通过页面元素的滚动，来驱动元素属性的变化实现动画效果。比如现在要实现下面这样的一个效果，随着页面的滚动，文字的颜色需要从红色逐渐变成蓝色。这在以前通过纯css是实现不了的。但是现在不一样了

![](./scroll-color.gif)

可以看看到随着页面滚动，文字的颜色在不断的变化，从红色逐渐变成了蓝色，然后反向滚动时，又慢慢变成了红色。也就是这颜色变化的动画，完全受到滚动的控制。那这样的效果是如何使用代码实现的呢

```html
<style>
.scroll-color {
  margin: 50px auto;
  width: 500px;
  height: 200px;
  overflow-y: auto;
  animation: color linear forwards;
  animation-timeline: scroll(self);
}
@keyframes color {
  from {color: red}
  to {color: blue}
}
</style>

<div class="scroll-color">
  豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越.....此处省略 n 字
</div>
```

对比发现 animation 属性中没有设置时间，因为这个动画是不受时间控制的。而是通过 animation-timeline 这个属性来设置的。

```css
animation-timeline: scroll(self);  /* 表示元素自身滚动驱动动画 */
```

scroll 除了可以使用 `self` 指定自身滚动驱动，还可以设置 `nearest`, `root` 两个值，分别表示最近的可滚动你祖先元素和文档根元素。



当然除了选择滚动元素，还可以指定滚动方向。比如

```css
animation-timeline: scroll(block nearest);
```

滚动方向支持四种值`block`, `inline`, `x`, `y`

其中x，y表示水平和竖直方向。在默认情况下 block和 y 一致，inline 和 x一致。但是当我们改变书写模式时比如writing-mode 改成从上往下，从右往左，这时候 block 和 x一致，inline 和 y 一致



## 平级元素滚动驱动

在上面提到的选择滚动元素的值要么是自身，要么是祖先元素，但是如果滚动元素和应用动画的元素是兄弟关系，直接套用上面的代码是无法做到的。

```html
<style>
  body {
    timeline-scope: --progress-scroller;
  }
  .progress {
    width: 500px;
    height: 10px;
    background-color: red;
    transform-origin: 0 0;
    margin: 50px auto 0;
    animation: scale linear forwards;
    animation-timeline: --progress-scroller;
  }
  .scroll-color {
    margin: 0 auto;
    width: 500px;
    height: 200px;
    overflow-y: auto;
    scroll-timeline-name: --progress-scroller;
    animation: color linear forwards;
    animation-timeline: --progress-scroller;
  }
  @keyframes color {
    from {color: red}
    to {color: blue}
  }
  @keyframes scale {
    from {transform: scaleX(0);}
    to {transform: scaleX(1);}
  }
</style>

<div class="progress"></div>
<div class="scroll-color">
  豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越.....此处省略 n 字
</div>
```

可以看看见 scroll-color 滚动元素多了一个兄弟元素 progress。实现在滚动的时候，使用 progress 来显示滚动进度

![](./progress.gif)

而完成这一功能的需要在滚动元素中添加`scroll-timeline-name: --progress-scroller;` 这样一段代码，相当于给这个滚动定了一个名字，同时需要在滚动元素和动画元素的共同父元素这里取的是 body 元素添加 `timeline-scope: --progress-scroller;` 需要应用动画的元素上面就可以使用这个名字来指定驱动元素`animation-timeline: --progress-scroller;`

> 警告
>
> 在通过 scroll-timeline-name 来定义名字时，名字要符合 css 变量的命名规则 --开头



## js 控制

如果你要在一些不支持滚动驱动动画的浏览器上实现类似效果，我们也可以通过 js 来监听元素滚动，然后配置 animation css 来实现类似效果

```html
<style>
.progress {
  animation: scale 1s linear forwards paused;
  animation-delay: var(--scroll-progress);
 }
</style>

<script>
  document.querySelector('.scroll-color').addEventListener('scroll', e => {
    const rate = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);
    document.documentElement.style.setProperty('--scroll-progress', `${-rate}s`);
  });
</script>
```

animation增加时间为1s, 并且将动画播放状态设置为暂停状态， 在 js 中监听滚动元素的滚动事件，计算滚动距离，最后通过 css 变量设置一个负数的动画延时

实际运行效果和上面滚动驱动效果一致，有兴趣的可以自行实现一下



---

animation-timeline 除了设置 scroll() 或者一个动画名称，还可以设置 view() 表示视图驱动动画。进度和元素出现及元素离开视图有关，有机会下次再讲 view()
