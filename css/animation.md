# Animation

通过 `@keyframes` 定义动画关键帧，通过 `animation` 引用动画。然而通过添加删除 `class` 的方式无法重启动画

```css
.spin {
  animation: spin 1s linear infinite;
}
```

当首次添加 spin 到某个元素 class 上时，会启动 spin 定义的动画，当删除 spin 类之后，动画结束。但是当再次添加 spin 类时，我电脑上的 chrome 这个动画是重启了的。但是手机上却是没有重启。可以通过定义两个一模一样的动画，用不同的 class 分别引用。两个 class 交互添加删除

```css
.spin1 {
  animation: spin1 1s linear infinite;
}
.spin2 {
  animation: spin2 1s linear infinite;
}
```

删除 spin1 后，添加 spin2 来重启动画，删除 spin2 后添加 spin1 来重启动画