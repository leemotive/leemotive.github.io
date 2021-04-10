Number.prototype.toFixed存在精度问题
```javascript
1.005.toFixed(2) // 1.00
1.45.toFixed(1) // 1.4
1.65.toFixed(1) // 1.6
1.85.toFixed(1) // 1.9 正常
```