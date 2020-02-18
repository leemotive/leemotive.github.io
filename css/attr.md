# attr
插入特定属性的值

```html
<style>
  div:after {
    content: attr(data-title)
  }
</style>

<div data-title="写在属性里被插入到after里面"></div>
```
