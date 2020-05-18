# Fullscreen

requestFullscreen和exitFullscreen一对api完成对浏览器的全屏和退出的功能
```javascript
// 打开全屏方法
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    }
}

// 退出全屏方法
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
```

requestFullscreen方法是某个元素上的方法，把当前元素全屏显示，元素的高度为桌面的宽度及高度。

退出全屏需要从document上调用exitFullscreen

在元素全屏时有伪类`:fullscreen`可用来定义全屏时的样式, 不同浏览器之前可能需要加前缀

相对应的还有`::backdrop`

