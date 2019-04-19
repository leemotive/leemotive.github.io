# classnames
生成dom元素的class属性值
```javascript
function classnames(...args) {
  let stack = [].concat(args.reverse());
  const names = [];
  while(stack.length) {
    const name = stack.pop();
    const nameType = typeof name;
    if (!name) {
      continue;
    }
    if (Array.isArray(name) && name.length) {
      stack.push(...name.reverse());
    } else if (nameType === 'object') {
      Object.entries(name).forEach(([key, value]) => {
        if (value) {
          names.push(key);
        }
      })
    } else if (['string', 'number'].includes(nameType)) {
      names.push(name);
    }
  }
  return names.join(' ');
}
```
