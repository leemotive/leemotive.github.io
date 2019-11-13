# 可能的ip地址

从整串数字里解析出可能的ipv4地址

```javascript
function restoreIpAddresses (s) {
  const res = [];
  
  res.push(s[0])
  for (let cIndex = 1; cIndex < s.length; cIndex++) {
    const ch = s[cIndex];
    for (let index = res.length - 1; index >= 0; index--) {
      let ip = res[index];
      let newIp = ip + ch;
      const end = newIp.match(/(?:^|.)(\d*)$/)[1];

      if (end > 255 || end.length > 3) {
        if ((ip.match(/\./g) || []).length === 3) {
          res.splice(index, 1)
        } else {
          res[index] = ip + '.' + ch;
        }
      } else {
        res[index] = newIp;
        if ((ip.match(/\./g) || []).length < 3) {
          res.push(ip + '.' + ch);
        }
      }
    }
  }

  return res.filter(function (ip) {
    return ip && (ip.match(/\./g) || []).length === 3 && !/(^|\.)0\d/.test(ip);
  });
}
```
