1. onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了
2. DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片等其他资源



- 默认script
script标签的加载及执行默认情况下是按顺序来的，为提高性能，浏览器支持多个script标签的资源并行下载，但是js是单线程，自然执行是按顺序来的。

  加载解析执行script的时候是阻塞文档解析渲染的。这也是为什么性能优化的时候都推荐将script标签都放在body结尾的地方，这样可以在加载执行script的时候，页面元素已经解析显示。可以尽早看到页面，而不是白屏等待

- 有defer属性的script
不阻塞页面的渲染，脚本加载和文档解析并行进行，执行要在文档解析完成，DOMContentLoaded事件触发之前。所有有defer属性的script标签执行是按顺序的。

- 有async属性的script
不阻塞页面的渲染，脚本在加载完成后阻断页面渲染立即解析执行，然后继续页面渲染，当然这类script可以在DOMContentLoaded事件之后才加载完成并执行
