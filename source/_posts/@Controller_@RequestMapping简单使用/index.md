---
title: "@Controller @RequestMapping简单使用"
author: 柚子816
toc: true
comment: true
date: 2013-10-24 19:11:00
tags: 
  - spring
category: Java
cover: 
---

最近项目不忙，把项目上用到的些东西自己尝试了一下

项目上通过在类上加`@Controller`和`@RequestMapping` 两个注解来实现处理前台的请求

先记述这个的用法，这个主要在配置文件

首先web.xml


```xml
<context-param>    
    <param-name>contextConfigLocation</param-name>  
    <param-value>
        /WEB-INF/applicationContext.xml
    </param-value>   
</context-param>  

<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>

<servlet>  
    <servlet-name>query</servlet-name>  
    <servlet-class>  
        org.springframework.web.servlet.DispatcherServlet  
    </servlet-class>  
    <init-param>  
        <param-name>contextConfigLocation</param-name>  
        <param-value>  
            /WEB-INF/applicationContext.xml
        </param-value>  
    </init-param>  
    <load-on-startup>2</load-on-startup>  
</servlet>  

<servlet-mapping>  
    <servlet-name>query</servlet-name>  
    <url-pattern>/</url-pattern>  
</servlet-mapping> 
```

然后是web.xml中配置的applicationContext.xml

```xml
    
    <context:component-scan base-package="lee.spring.jpa.query.controller" />
    
    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/jsp/" />
        <property name="suffix" value=".jsp" />
    </bean>
    
    <bean class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter"/>
```

第一个配置的controller类所在包路径，然后配置的jsp文件所在目录

现在可以看java文件了

```java
package lee.spring.jpa.query.controller;
import ......
@Controller
public class MainController {
  
  @RequestMapping("/find")
  public String findUser(){
    return "userlist";
  }
}
```

这样在一个画面点击连接，设置好`<a>`的href，就可进入findUser方法，并进入userlist画面

userlist.jsp文件需要放在配置文件所配的路径当中

