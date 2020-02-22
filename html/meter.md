# meter

HTML5新增标签，显示已知数据范围内的值，并给出相应的颜色

- form 规定meter元素所属的表单，暂无浏览器支持
- high 高值边界
- low 低值边界
- max 范围的最大值
- min 范围的最小值
- optimum 最佳值
- value 当前值

根据value落在的区间，meter会显示出不同颜色，颜色规则如下
- 没有设置optimum，中间段为绿色，两侧为黄色
- 设置了optimum，optimum所在区间为绿色，相邻区间为黄色，间隔的区间为红色
