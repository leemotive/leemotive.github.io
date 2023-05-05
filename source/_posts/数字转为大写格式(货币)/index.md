---
title: "数字转为大写格式(货币)"
author: 柚子816
toc: true
comment: true
date: 2015-12-25 20:49:00
tags: 
  - JavaScript
keywords:
  - 数字
  - 金额
  - 大写
category: 前端
cover: 
---

不确定是不是能正确转化所有数字，如发现有哪些数字转化不对，请指正


​    
```js
function digit2Uppercase (num) {
    var digit, iUnit, dUnit, index, iStr, dStr, MAX_NUM = 999999999999.99;

    if (num > MAX_NUM) {
        return 'Exceed the upper limit ' + MAX_NUM;
    }

    digit = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
    iUnit = ['元','拾','佰','仟','万','拾','佰','仟','亿','拾','佰','仟'];
    dUnit = ['角', '分'];
    index = 0;

    dStr = '';
    for (index = 0; index < dUnit.length; index++) {
        dStr += digit[Math.floor(num * Math.pow(10, index + 1)) % 10] + dUnit[index];
    }
    dStr = dStr.replace(/零./g, '零').replace(/零+$/, '');

    num = Math.floor(num);
    iStr = '';
    for (index = 0; index < iUnit.length && num > 0; index++) {
        iStr = digit[num % 10] + iUnit[index] + iStr;
        num = Math.floor(num / 10);
    }
    iStr = iStr.replace(/(?:零[^亿万])*零([亿万元])/g, '$1').replace(/(零.)+/g, '零').replace('亿万', '亿零').replace(/零零+/g, '零').replace('零元', '元');
    iStr += dStr || '整';
    iStr = iStr.replace(/^整$/, '零元整');
    return iStr;
}
```

