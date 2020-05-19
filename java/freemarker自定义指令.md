# freemarker 自定义指令

时隔多年再遇 java-web 前端项目，java 模板引擎使用的 freemarker。默认是没有 block, extends 之类的指令的。在 js 模板引擎 pug 里是有的，velocity 也是支持 extends 的。为什么 freemarker 没有。还好 freemarker 支持自定义指令，而且已经有每三方实现了

```
com.googlecode.rapid-framework:rapid-core:4.0.5
```

直接引入就好并进行指令注册就好了。

注册指令时，如果用的是 `FreeMarkerConfigurer` 就直接调用它的 `setFreemarkerVariables` 方法，如果用的是 `Configuration` 类，那就调用它的 `setSharedVariable` 方法进行注册。



自定义指令方式就是写一个类，实现 `TemplateDirectiveModel` 接口，并实现接口的 `execute` 方法，在此方法内实现指令逻辑，实例代码网上寻找

