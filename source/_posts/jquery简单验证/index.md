---
title: "jquery简单验证"
author: 柚子816
toc: true
comment: true
date: 2013-10-28 19:17:00
tags:
  - jquery
keywords:
  - class
  - required
  - validate
category: 前端
cover: 
---

项目上要求输入框是必输项，于是共通组要求在必输项的控件上加上 class＝“required”

当时就觉得奇怪，为什么加了个class就能实现，必输项控制，class不是CSS里的类么

最近查阅了一下，做个简述

这里用了jquery的验证

在jsp文件中引入jquery, jquery.validate.js,jquery.message.js,jquery.metadata.js

在jsp中加入


​    
```js
$.validator.setDefaults(
        {
            submitHandler:function(){
            	alert("validate OK");
                document.forms[0].submit();
            }
        }       
);

$.metadata.setType("attr", "validate");

$("form").validate(
        {
            errorPlacement:function(error, element){
                error.appendTo(element.parent());
            }
        }       
);
```

在某个输入控件上添加class＝“required”就可以在提交表单时检查该控件是否输入值，并给予提示。如


​    
```html
<form:form action="/springjpaquery/find" commandName="mainCondition" method="post">
    <form:input path="zipCode" class="required isZipCode"/>
    <input type="submit" value="refresh" />
</form:form>
```

这里form:form标签是spring的表单标签，我直接自己工程中拷贝过来的。

如果没有输入直接点击提交会提示“ This field is required. ”

这个信息是jquey.validate.js中定义好的，可以在js文件中看见

当然啊如果需要自定义也可以，在文件中加入

```js
jQuery.extend(jQuery.validator.messages, {  
	required: "必选字段",  
});
```



这时既可以提示“ 必选字段 ”

isZipCode是自定义的验证规则，当没有提供现成的时候需要自己定义规则


​    
```js
jQuery.validator.addMethod("isZipCode", function(value, element) {  
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的邮政编码");
```

提示消息的位置，方式，style都可以按照自己的方式进行设置。这里不作细述

在尝试的时候发现一个问题，总是提示不能识别$,也就是js没有成功引入。在输入框直接输入js文件地址，也访问不到jquery文件，找了半天才发现是web.xml文件的配置问题。

在web.xml文件中加入


​    
```xml
<servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.js</url-pattern>
</servlet-mapping>
```

这样就可以，

不是每个工程都需要这样，可能和我自己的工程配置有关，以后遇到这样的问题，需要注意

