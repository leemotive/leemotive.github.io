# 跨表分页查询

实际应用中可能会涉及数据分布在不同的表中，但是又希望分页查询，以下代码是一个js版本的模拟的
```javascript
function query(page, pageSize) {
  // source1...source5是模拟中的五张表，每张表数据量不同，后面通过slice来模拟分页查询
  const source1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  const source2 = [17,18,19];
  const source3 = [20,21];
  const source4 = [];
  const source5 = [22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];

  const sources = [source1, source2, source3, source4, source5];

  let skip = page * pageSize;

  let from = 0, source;
  for(; from < sources.length; from++) {
    source = sources[from];
    if (skip < source.length) {
      break;
    }
    skip = skip - source.length;
    source = void 0;
  }

  if (!source) {
    return [];
  }

  let start = (skip / pageSize | 0) * pageSize;
  
  let data = source.slice(start, start + pageSize * 2);
  start = skip % pageSize;
  const result = data.slice(start, start + pageSize);

  if (result.length >= pageSize) {
    return result;
  }

  for(from++; from < sources.length; from++) {
    source = sources[from];
    data = source.slice(0, pageSize);
    result.push(...data.slice(0, pageSize - result.length));
    if (result.length >= pageSize) {
      break;
    }
  }
  return result;

}
```
