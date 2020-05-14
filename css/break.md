# word-break 和 break-word

关于长文本如何打断换行的问题，一般来讲会用到 `word-break` 或者 `word-wrap/overflow-wrap` 这两个属性

## overflow-wrap

`overflow-wrap` 是 css3 中的名字，`word-wrap` 是以前的名字，现在成别名了

它默认行为是 normal, 在空格处进行换行，单词内不换行，所以连续的英文字符会导致长度溢出

另外一个值是 break-word。它可以在单词内断开进行换行，但是优先让整个单词移到下一行，如果一整行都容纳不下这一个单词，则单词在新行显示，同时发问溢出部分断开换行。所以上一行的尾部可能会很长一段空白

至于另外一个属性值 anywhere，在容器宽度固定时，和 break-word 也没有太大区别，在窗口宽度被设置为 min-content 的时候，内容会在任何地方断开让文本宽度尽可能小。而 break-word 则不会，只有外超出容器最大宽度溢出时才会断开换行

## word-break

它默认值也是 normal，

break-all 会在单词溢出时出现打断单词进行换行，这样能保证行尾不出现大片空白

keep-all 不允许CJK文本中的单词换行，在空格或者连字符处换行，非CJK文本和 normal 一致

break-word 已经被标注为 deprecated

