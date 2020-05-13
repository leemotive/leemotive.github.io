# media

- prefers-color-scheme

  媒体查询，用于检测用户是否有将系统的主题色设为亮色或者暗色

  - no-preference

    未设置偏好

  - light

    亮色主题

  - dark

    暗色主题

  ```css
  div {
    width: 100px;
    height: 100px;
    background-color: darkkhaki;
  }
  @media (prefers-color-scheme: dark) {
    div {
      background-color: chocolate;
    }
  }
  ```

  在 html 中也可以通过此媒体查询来改变图片

  ```html
  <picture>
    <source srcset="./dark.jpg" media="(prefers-color-scheme: dark)">
    <img src="./light.jpg" />
  </picture>
  ```

  