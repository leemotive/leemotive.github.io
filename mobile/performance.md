# performance

- Performance Timing API
- Profile工具
- 页面埋点计时


## 网络加载类
- 减少HTTP资源请求次数
- 减小HTTP请求大小
- 资源文件放在外部，避免script, link标签内联
- 避免href和src等属性为空
- 为HTML指定合理的Cache-Control或者Expires
- 合理设置Etag和Last-Modified
- 减小页面重定向
- 静态资源分域存放增加下载并行数
- 使用静态资源CDN
- 使用CDN Combo下载传输内容
- Ajax请求合理缓存
- 减小Cookie大小并进行Cookie隔离，静态资源使用不同的域名
- 缩小favicon.ico并缓存
- 异步Javascript资源
- 消除阻塞渲染的CSS和Javascript
- 避免使用CSS import引用加载CSS


## 页面渲染类
- CSS资源引用放在HTML结构顶部
- JavaScript资源引用放到HTML文件底部
- 不在HTML中直接缩放图片
- 减少DOM元素数量和深度
- 尽量避免使用table, iframe等元素
- 避免运行耗时的Javascript
- 避免使用CSS表达式或者CSS滤镜


## 网络加载类
- 首屏数据请求提前，避免js文件加载后才请求数据
- 首屏加载和按需加载，非首屏内容滚屏加载，首屏内容最小化
- 模块化资源并行下载
- inline首屏必备资源
- meta dns prefetch设置DNS预解析
- 资源预加载
- 合理利用MTU

## 缓存类
1. 合理利用浏览器缓存
2. 静态资源离线方案
3. 合理使用AMP HTML

## 图片类
1. 图片压缩处理
2. 使用较小的图片，合理使用base64内嵌图片
  > 一般超过2K就不推荐使用了
3. 使用更高压缩比的格式的图片如webp等

4. 图片懒加载
5. 使用MediaQuery或者srcset根据不同屏幕加载不同图片
6. 使用iconfont代替图片图标
7. 定义图片大小限制
  > 单张图片一般建议10KB以内，不超过30KB,

## 脚本类
1. 使用id选择器
2. 合理缓存DOM对象
3. 尽量使用事件代理，避免直接事件绑定
4. 使用touchstart代替click
5. 避免touchmove，scroll等事件连续处理
6. 避免使用eval, with。使用join代替连接符+，推荐使用字符串模板语法
7. 尽量使用es新特性来编程

## 渲染类
1. 使用Viewport固定屏幕渲染，可以加载页面渲染内容
2. 避免各种形式的重排重绘
3. 使用CSS3动画，开启GPU加速
  > 设置`transform: translateZ(0)`来开启移动设备浏览器GPU图形处理加速
4. 合理使用Canvas和requestAnimationFrame
5. SVG代替图片
6. 避免float布局
7. 避免过多的iconfont

## 架构协议类
1. 尝试使用SPDY和HTTP2
2. 后端数据渲染
3. 使用Native View代替DOM


移动端首屏加载最长时间推荐1.5s内，不超过3s。PC端推荐1s内，不超过1.5s


## 针对百度搜索引擎的优化建议
- 每个网页都应该有独一无二的标题，切忌所有的页面都使用同样的默认标题
- 标题主题明确，应该包含见面中最重要的信息
- 简明精练，不应该罗列与网页内容不相关的信息
- 建议重要内容放在到title靠前位置

### 网站不同页面title的定义可以设置如下
- 首页：网站名称_提供服务介绍或者产品介绍
- 列表：列表名称_网站名称
- 文章页：文章标题_文章分类_网站名称
- 如果文章标题不是很长，可以考虑增加关键词来提高搜索量

### keywords
页面内容检索的辅助关键字信息，容易被搜索引擎检索到

### description
更多是作为搜索结果的描述，一般不超过78个字符，移动端一般不超过50个字符

### 标签语义化
- 使用具有语义化的HTML5标签
- 唯一的H1标签
- img添加alt属性

### 301跳转
如果URL发生变更，要为旧的地址添加301跳转

### canonical
当页面有不同参数传递时，不同参数的URL，搜索引擎会认为是同一个页面。可以在head里添加cononical告诉搜索引擎按照指定的地址去处理
```html
<link rel="cononical" href="//:domain.com/index.html" />
```

### robots
使用robots.txt配置

### sitemap
可以分为HTML和XML两种，命名可以为sitemap.html或者sitemap.xml。作用是列表网站所有URL地址，方便搜索引擎去逐个抓取网站的页面，增加网站页面在搜索引擎中的曝光量



## 高效前端建议
- 能用HTML/CSS解决的问题就不用JS
- 尽可能使用伪元素  
    辅助视觉类元素，清除浮动
- 避免全局耦合
- 减少重复代码  
    出现了重复代码->封装成一个函数->封装成一个模块->封装成一个插件
- 按强类型风格书写代码
- 减少使用全局变量
- 频繁使用到全局变量时可以先局部变量先保存一下，后续使用局部变量
- 避免使用==
- 简单的if-else使用三目运算符
- 减少magic number
- 字符串模板
- 善用块级作用域
- 善用performance工具
- srcset响应式图片
- 图片延迟加载
- 开启gzip
- DNS预读取
- HTML文件压缩
- 加Loading效果
- 过渡效果
- console.table, console.dir, console.trace 及带样式输出
- 使用css3动画
- 拖拽读取主要依赖drag事件
- 前端图片裁剪，减轻服务端压力
- Service Worker实现PWA离线网页应用
- 传统Web APP的缺点
    - 没有桌面入口
    - 无法离线使用
    - 没有Push推送
