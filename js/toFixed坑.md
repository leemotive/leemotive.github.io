Number.prototype.toFixed存在精度问题
```javascript
1.005.toFixed(2) // 1.00
```
并没有返回1.01
