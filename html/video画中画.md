# video 画中画

对于 video 标签播放视频，可以启用画中画功能，让视频播放可以在浏览器窗口最小化的时候仍然可以在桌面上继续播放

```js
if (document.pictureInPictureElement && !videoElement.disablePictureInPicture) {
  console.log('可以正常使用画中画功能')
}
```

默认的视频控制功能里面是有画中画功能按钮的，点击就可以开启进入画中画模式，此时浏览器标签上也会出现一个小图标表示当前正在画中画模式，当然也可以通过 js 去控制

```js
document.pictureInPictureElement // 返回的是当前正在画中画模式下的元素
videoElement.requestPictureInPicture() // 进入画中画模式
document.exitPictureInPicture() // 退出画中画模式
```

对于进入和退出画中画模式也是有事件可以监听的

```js
videoElement.addEventListener('enterpictureinpicture', e => {
  console.log('进入画中画模式')
})
videoElement.addEventListener('leavepictureinpicture', e => {
  console.log('退出画中画模式')
})
```

