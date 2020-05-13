# min, max, clamp 函数

- min

  函数用于返回最小值，参数支持各种单位，及表达式

- max

  返回的是最大值

- clamp

  接收三个参数 MIN, VAL, MAX，这个函数可以理解为 max(MIN, min(VAL, MAX))

  也就是说如果 VAL 介于 MIN 和 MAX 之间，则取 VAL，如果小于 MIN，则取 MIN 值，如果大于 MAX 则取 MAX 值

