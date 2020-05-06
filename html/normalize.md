# normalize

```js
node.normalize();
```

规范化元素节点，使其子节点中没有空的文本节点，没有相邻的文本节点

```js
// container 为一个空的容器，没有任何内容，包括空格换行等 
container.appendChild(document.createTextNode('node1'));
container.appendChild(document.createTextNode('node2'));

container.childNodes.length // 2
container.normalize()
container.childNodes.length // 1
```
