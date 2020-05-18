## 元素选择符

|选择符|描述|
|---|---|
|\*|通配选择符（Universal Selector），选择所有元素对象|
|E|类型选择符（Type Selector），选择特定元素标签|
|\#|id选择符（ID Selector）|
|.|class选择符（Class Selector）|

## 关系选择符

|选择符|描述|
|---|---|
| E F |包含选择符（Descendant combinator），选择所有被E元素所含的F元素|
|E > F   |子元素选择符（Child combinator），选择E元素的子元素，不包含下级子元素|
|E + F   |相邻选择符（Adjacent sibling combinator），选择紧贴在E元素之后的F元素|
|E ~ F  |(css3)兄弟选择符（General sibling combinator），选择E元素所有兄弟元素F|

## 属性选择符

|选择符|描述|
|---|---|
|E[attr]  |选择具有attr属性的元素|
|E[attr="val"] |选择attr属性值等于val的元素|
|E[attr~="val"]  |选择attr属性值包含val的元素（属性值用空格分割，其中一个为val）|
|E[attr^="val"]  |(css3)选择attr属性值以val开头的字符串的元素|
|E[attr$="val"]  |(css3)选择attr属性值以val结尾的字符串的元素|
|E[attr*="val"]  |(css3)选择attr属性值包含val字符串的元素|
|E[attr\|="val"]  |选择attr属性值为val开头并用“-”分割的元素，如果属性值仅为val，也会被选择|

## 伪类选择符

|选择符|描述|
|---|---|
|E:link|未被访问的超链接|
|E:visited|链接地址被访问过的超链接|
|E:hover|有鼠标悬停的元素|
|E:active|被用户激活的元素(鼠标点击未释放)|
|E:focus|获取到焦点的元素|
|E:lang(fr)|使用特殊语言的元素|
|E:not(s)|不含有s选择符的元素|
|E:root|E元素所在文档的根元素|
|E:empty|没有任何子元素的元素(包括文本节点，空白字符也不行)|
|E:checked|处于选中状态的元素E（用于radio和checkbox, 可以用作样式优化）|
|E:enabled|处于可用状态的元素|
|E:disabled|处于禁用状态的元素|
|E:target|匹配相关URL指向的元素(URL中带有锚点时指向页面中对应id的元素)|
|@page:first|页面容器第一页|
|@page:left|页面容器位于装订线左边的所有页面|
|@page:right|页面容器位于装订线右边的所有页面|
|E:invalid|不合法的表单字段(只作用于能指定区间值的元素，例如 input 元素中的 min 和 max 属性，及正确的 email 字段, 合法的数字字段等)|
|E:valid|合法的表单字段|
|:out-of-range|选择 range 类型的输入框，且输入值在范围外|
|:in-range|选择 range 类型的输入框，且输入值在范围内|

## 伪对象选择符

|选择符|描述|
|---|---|
|E::first-letter|对象内的第一个字符|
|E::first-line|对象内第一行|
|E::before||
|E::after||
|E::placeholder|对象文字占位符|
|E::selection|对象被选择时(颜色样式)|
