# date

简单常用的时间格式化与解析

- 格式化只支持格式化为数字，不支持英文及中文
```javascript
format (date, fmt) {
  // 只支持年月日时分秒的数字型的格式化，不支持英文及简写等
  date = new Date(date)
  let methods = {
    'M': 'getMonth',
    'd': 'getDate',
    'h': 'getHours',
    'm': 'getMinutes',
    's': 'getSeconds'
  }

  return fmt.replace(/y+|M+|d+|h+|m+|s+/g, function (str) {
    const ch = str[0]
    const len = str.length
    if (ch === 'y') {
      return `${date.getFullYear()}`.slice(-len)
    } else {
      let v = date[methods[ch]]()
      v = ch === 'M' ? v + 1 : v
      return len === 1 ? v : `${v}`.padStart(2, 0)
    }
  })
}
```

- 从字符串解析日期
```javascript
function parse(str, format) {
  const units = format.match(/(am|pm|.)\1*/g);
  const dateArr = str.split('');

  let lastIndex = 0;
  let isAm;
  let year = 1970,
    month = 1,
    date = 1,
    hour,
    minute,
    second,
    millisecond;
  while (units.length) {
    const u = units.shift();
    if (isUnit(u)) {
      let value;
      if (nextUnitType() === 'unit') {
        value = getUnitValue(u);
        setValue(u, value);
      } else {
        value = getUnitValueUntilDelimiter();
      }
      setValue(u, value);
    } else {
      const delimiterValue = getUnitValue(u);
      if (!delimiterValue) {
        throw new Error('日期字符串和格式字符串不匹配');
      }
      if (u === 'am' || u === 'pm') {
        const lowercase = delimiterValue.toLowerCase();
        if (lowercase === 'am' || lowercase === 'pm') {
          isAm = lowercase === 'am';
        }
      } else if (delimiterValue !== u) {
        throw new Error('日期字符串和格式字符串不匹配');
      }
    }
  }
  if (lastIndex < dateArr.length) {
    throw new Error('日期字符串和格式字符串不匹配');
  }

  if (maxDaysInMonth(year, month) < date) {
    throw new Error(`invalid date[${date}] in month[${month}]`);
  }
  if (isAm !== undefined) {
    if (hour > 11) {
      throw new Error(`invalid hour[${hour}]`);
    }
    hour = hour + (isAm ? 0 : 12);
  }

  return new Date(
    ...trim(year, month - 1, date, hour, minute, second, millisecond)
  );

  function isLeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }

  function maxDaysInMonth(year, month) {
    if (month === 2) {
      return isLeapYear(year) ? 29 : 28;
    }
    return (Math.ceil(Math.abs(month - 7.5)) % 2) + 30;
  }

  function isUnit(u) {
    return /^(y+|M+|d+|H+|m+|s+|S+)$/.test(u);
  }

  function nextUnitType() {
    const u = units[0];
    return isUnit(u) ? 'unit' : 'delimiter';
  }

  function getUnitValue(u) {
    const value = dateArr.slice(lastIndex, lastIndex + u.length).join('');
    lastIndex += u.length;
    return value;
  }

  function getUnitValueUntilDelimiter(u) {
    let value = '',
      i;
    for (i = lastIndex; i < dateArr.length; i++) {
      const v = dateArr[i];
      if (/\d/.test(v)) {
        value += v;
      } else {
        break;
      }
    }
    lastIndex = i;
    return value;
  }

  function setValue(u, value) {
    if (u.includes('y')) {
      year = +value;
    } else if (u.includes('M')) {
      if (value > 12 || value < 1) {
        throw Error(`invalid month[${value}]`);
      }
      month = +value;
    } else if (u.includes('d')) {
      if (value > 31 || value < 1) {
        throw Error(`invalid date[${value}]`);
      }
      date = +value;
    } else if (u.includes('H')) {
      if (value > 23) {
        throw Error(`invalid hour[${value}]`);
      }
      hour = +value;
    } else if (u.includes('m')) {
      if (value > 59) {
        throw Error(`invalid minute[${value}]`);
      }
      minute = +value;
    } else if (u.includes('s')) {
      if (value > 59) {
        throw Error(`invalid second[${value}]`);
      }
      second = +value;
    } else if (u.includes('S')) {
      if (value > 999) {
        throw Error(`invalid millisecond[${value}]`);
      }
      millisecond = +value;
    }
  }

  function trim(...p) {
    let index = p.length - 1;
    for (; index >= 0 && p[index] === undefined; index--) {}
    return p.slice(0, index + 1);
  }
}
```
