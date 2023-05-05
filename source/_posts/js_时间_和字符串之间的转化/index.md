---
title: "js 时间 和字符串之间的转化"
author: 柚子816
toc: true
comment: true
date: 2015-12-29 21:50:00
tags: 
  - JavaScript
keywords:
  - "时间"
  - "字符串"
  - "转化"
category: 前端
cover: 
---

之前写到过，js中new Date()能接受的字符串格式，各个浏览器不一样，这次写了个关于时间对象和字符串之间的转化的方法

时间对象转化为字符串


​    
```javascript
function formatDate (date, format) {
    var convert, res = '';
    convert = {
        'y': function (str) {
            return (date.getFullYear() + '').slice(-(str.length < 4 ? 2 : str.length));
        },
        'M': function (str) {
            var length, m, month, monthName;
            length = str.length < 6 ? str.length : 6;
            month = date.getMonth() + 1;
            monthName = [
                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            ];
            if (length === 1) {
                m = month;
            } else if (length === 2) {
                m = ('0' + month).slice(-2);
            } else {
                m = monthName[length - 3][month - 1];
            }
            return m;
        },
        'd': function (str) {
            var d = date.getDay();
            return str.length === 1 ? d : ('0' + d).slice(-2);
        },
        'H': function (str) {
            //24小时制
            var h = date.getHours();
            res = '';
            return str.length === 1 ? h : ('0' + h).slice(-2);
        },
        'h': function (str) {
            //12小时制
            var h;
            h = date.getHours();
            res = ' AM';
            if (h > 12) {
                h = h - 12;
                res = ' PM';
            }
            return str.length === 1 ? h : ('0' + h).slice(-2);
        },
        'm': function (str) {
            var m = date.getMinutes();
            return str.length === 1 ? m : ('0' + m).slice(-2);
        },
        's': function (str) {
            var s = date.getSeconds();
            return str.length === 1 ? s : ('0' + s).slice(-2);
        },
        'S': function (str) {
            var s = date.getMilliseconds();
            return str.length === 1 ? s : ('00' + s).slice(-3);
        },
        'D': function (str) {
            var d, name, length;
            name = [
                ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],
                ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                ['周日','周一','周二','周三','周四','周五','周六']
            ];
            d = date.getDay();
            length = str.length < 4 ? str.length : 4;
            return name[length - 1][d];
        }
    }
    return format.replace(/y+|M+|d+|H+|h+|m+|s+|S+|D+/g, function (str) {
        return convert[str.charAt(0)](str);
    }) + res;
}
```

符号解释

y : 年份 yy两位数 yyyy四位数

M : 月份 M 数字无前置的0，MM有前置0，MMM英文缩写，MMMM英文完整写法，MMMMM中文如十二月 ，MMMMMM 数字+月 如 6月 无前置0

d : 日 d无前置0，dd有前置0

H : 24小时制 H无前置0，HH有前置0

h : 12小时制 h无前置0，hh有前置0 （会在结果字符串末尾加上AM或者PM）

m : 分钟 m无前置0，mm有前置0

s : 秒数 s无前置0，ss有前置0

S : 毫秒数 S无前置0，SSS有前置0（SS也一样）

D : 星期 D英文缩写，DD英文完整写法，DDD中文如星期三，DDDD中文如周三

如 formatDate(new Date(), 'dd-MMM-yyyy HH:mm:ss SSS')

字符串转为时间对象


​    
```js
function parseDate (str, format) {
    var type, convert, year = 1970, month = 1, day = 1, hour = 0, minute = 0, second = 0, milli = 0, date;
    convert = {
        'y': function () {
            format = format.replace(/y+/, function (match) {
                var length;
                length = match.length;
                year = str.substring(0, length);
                str = str.replace(year, '');
                year = Number(year);
                return '';
            });
            return year;
        },
        'M': function () {
            month = undefined;
            format = format.replace(/M+/, function (match) {
                var length, single, tens, monthName;
                length = match.length;
                monthName = 'JAN1FEB2MAR3APR4MAY5JUN6JUL7AUG8SEP9OCT10NOV11DEC12一1二2三3四4五5六6七7八8九9十10十一11十二12';
                if (length < 3) {
                    str = str.replace(/^\d{1,2}/, function (num) {
                        month = Number(num);
                        return '';
                    });
                } else if (length < 6) {
                    var name, reg;
                    name = str.match(/\D+/)[0];
                    reg = new RegExp(name.substring(0,3).replace('月', '').toUpperCase() + '(\\d+)');
                    month = Number(monthName.match(reg)[1]);
                    str = str.replace(name, '');
                } else {
                    var match;
                    match = str.match(/(\d+)月/);
                    month = Number(match[1]);
                    str = str.replace(match[0], '');
                }
                return '';
            });
            return month;
        },
        'd': function () {
            day = undefined;
            format = format.replace(/d+/, function () {
                str = str.replace(/^\d{1,2}/, function (match) {
                    day = Number(match);
                    return '';
                });
                return '';
            });
            return day;
        },
        'h': function () {
            var apm;
            hour = undefined;
            format = format.replace(/h+/, function () {
                str = str.replace(/^\d{1,2}/, function (match) {
                    hour = Number(match);
                    return '';
                });
                return '';
            });
            apm = str.match(/AM|PM/i)[0];
            if (apm && apm.toUpperCase() === 'PM') {
                hour += 12;
            }
            str = str.replace(/AM|PM/ig, '');
            return hour;
        },
        'H': function () {
            hour = undefined;
            format = format.replace(/H+/, function () {
                str = str.replace(/^\d{1,2}/, function (match) {
                    hour = Number(match);
                    return '';
                });
                return '';
            });
            return hour;
        },
        'm': function () {
            minute = undefined;
            format = format.replace(/m+/, function () {
                str = str.replace(/^\d{1,2}/, function (match) {
                    minute = Number(match);
                    return '';
                });
                return '';
            });
            return minute;
        },
        's': function () {
            second = undefined;
            format = format.replace(/s+/, function () {
                str = str.replace(/^\d{1,2}/, function (match) {
                    second = Number(match);
                    return '';
                });
                return '';
            });
            return second;
        },
        'S': function () {
            milli = undefined;
            format = format.replace(/S+/, function () {
                str = str.replace(/^\d{1,2}/, function (match) {
                    milli = Number(match);
                    return '';
                });
                return '';
            });
            return milli;
        }
    };
    format = format.replace(/^[^a-zA-Z]+/, '');
    str = str.replace(/^[^a-zA-Z0-9一二三四五六七八九十]+/, '');
    while(type = format.charAt(0)) {
        if (convert[type] && convert[type]() !== undefined) {
            format = format.replace(/^[^a-zA-Z]+/, '');
            str = str.replace(/^[^a-zA-Z0-9一二三四五六七八九十]+/, '');
        } else {
            date = new Date('Invalid Date');
            break;
        }
    }
    date || (date = new Date(year, month - 1, day, hour, minute, second, milli));
    return date;
}
```

符号的意义是一样的，只是这里没有D（星期的符号），要注意的是这里不要传没有分割符无前置0的字符串如 parseDate('2012112',
'yyyyMd') 这样没法判断是2012-11-2还是2012-1-12，为结果正确请传入有分割符的字符串如 ‘2012/11/26’ 或者
‘2012-Aug-19’……

如发现有转化不正确的，请指正

