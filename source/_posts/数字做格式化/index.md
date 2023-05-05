---
title: "数字做格式化"
author: 柚子816
toc: true
comment: true
date: 2016-02-06 15:38:00
tags: 
  - JavaScript
keywords:
  - 数字
  - 格式化
  - 千分位
category: 前端
cover: 
---

数字格式化应该很常用，保留几位小数，四舍五入，千分位分割

奈何项目上原有格式化方法，功能比较单一，只能格式化成如 12,456,451.00这样的数字，整数部分千分位分割，小数部分直接舍弃，用两个0表示

无奈自己写了一个


​    
```js
/**
 * 格式化数字（小数位数，千分位逗号分割）
 * @param nStr 数字或者字符串
 * @param decimal 数字 小数位要补全的位数 默认2 如8.00
 * @param precision 小数部分有效的位数 默认0 如8.00 设置1所得结果如8.40
 * @param round 是否要四舍五入 true四舍五入 false直接截断 默认false
 * @param thousand 是否要千分们分割 默认false不分割
 * @param formatDecimal 小数部分是否要千分位分割 默认false不分割
 * @return string 格式化后的数字字符串
 */
function numFormat (nStr, decimal, precision, round, thousand, formatDecimal) {
    if (typeof decimal === 'boolean') {
        formatDecimal = typeof round === 'boolean' && round;
        thousand = typeof precision === 'boolean' && precision;
        round = decimal;
    } else if (typeof precision === 'boolean') {
        formatDecimal = typeof thousand === 'boolean' && thousand;
        thousand = typeof round === 'boolean' && round;
        round = precision;
    }

    typeof decimal === 'number' || (decimal = 2);
    typeof precision === 'number' || (precision = 0);
    precision = precision < decimal ? precision : decimal;
    round = typeof round === 'boolean' && round;
    thousand = typeof thousand === 'boolean' && thousand;
    formatDecimal = typeof formatDecimal === 'boolean' && formatDecimal;

    nStr || (nStr = 0);
    nStr = (nStr + '').replace(/[^\d\.]/g, '');
    if (round) {
        nStr = Number(nStr).toFixed(precision);
    } else {
        nStr += '';
        if (precision === 0) {
            nStr = nStr.replace(/\..*/, '');
        } else if (nStr.indexOf('.') >= 0) {
            for (var index = 0; index < decimal; index++) {
                nStr += '0';
            }
            nStr = nStr.replace(new RegExp('(\\.\\d{' + precision + '}).*'), '$1');
        }
    }

    nStr = Number(nStr).toFixed(decimal);
    var nArr = nStr.split('.');
    if (thousand && nArr[0]) {
        nArr[0] = nArr[0].replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1,');
    }
    if (thousand && formatDecimal && nArr[1]) {
        nArr[1] = nArr[1].replace(/(\d{3})(?=\d{1,3})/g, '$1,');
    }
    return nArr.join('.');
}
```

