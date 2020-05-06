# insertAdjacent

分为 insertAdjacentHTML, insertAdjacentElement, insertAdjacentText 三个方法

### insertAdjacentHTML
根据参数位置，插入字符串表示的元素节点
```js
node.insertAdjacentHTML('beforebegin', '<div>这是兄弟节点</div>')
```

第一个参数是用枚举值，共有四个值: `beforebegin`, `afterbegin`, `beforeend`, `afterend`

其中 before 和 end 表示相对位置，begin 和 end 分别表示开始和结束标签，所以
- beforebegin 开始标签前，也就是在 node 之前作为兄弟节点
- afterbegin 开始标签后，也就是作为 node 节点的第一个子节点
- beforeend 结束标签前，也就是作为 node 节点的最后一个子节点
- afterend 结束标签后，也就是作为 node 之后作为兄弟节点


insertAdjacentElement, insertAdjacentText 和 insertAdjacentHTML 相似，分别是插入 dom 元素和文本节点的

beforebegin 和 afterend 两个方法在执行的时候，node 必须有父元素才可以执行生效，否则
- insertAdjacentHTML 有 DOMException 异常抛出 
- insertAdjacentElement, insertAdjacentText 无异常抛出，也没有正常添加节点
