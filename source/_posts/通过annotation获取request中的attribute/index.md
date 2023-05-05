---
title: "通过annotation获取request中的attribute"
author: 柚子816
toc: true
comment: true
date: 2017-03-24 19:23:00
tags: 
  - java
keywords:
  - RequestAttribute
  - 注解
category: Java
cover: ./00085c0d-076a-4a7c-be97-0c8bcd96426d.jpg
---

在spring web工程中的controller可以通过@RequestParam获取request中的参数，也可以通过@PathVariable获取请求url中的参数。但是如果想要从request中获取attribute却是没有现在的注解（也许是没有找到吧），那只有自己对手，丰衣足食了。

注解定义


​    
```java
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
```


​    
```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequestAttribute {

    String value() default "";
    boolean required() default true;
}
```

注解处理定义


​    
```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver;

import path to RequestAttribute;
```


​    
```java
public class RequestAttributeMethodArgumentResolver extends AbstractNamedValueMethodArgumentResolver {
```


​    
```java
    public RequestAttributeMethodArgumentResolver() {
        super(null);
    }

    @Override
    protected NamedValueInfo createNamedValueInfo(MethodParameter parameter) {
        RequestAttribute annotation = parameter.getParameterAnnotation(RequestAttribute.class);
        return new RequestAttributeNamedValueInfo(annotation);
    }

    @Override
    protected Object resolveName(String name, MethodParameter parameter, NativeWebRequest request) throws Exception {
        HttpServletRequest httpServletRequest = request.getNativeRequest(HttpServletRequest.class);
        Object attribute = httpServletRequest.getAttribute(name);
        return attribute;
    }
```


​    
```java
    @Override
    protected void handleMissingValue(String name, MethodParameter parameter) throws ServletException {
        String paramType = parameter.getParameterType().getSimpleName();
        String methodName = parameter.getMethod().getName();
        throw new ServletRequestBindingException(String.format("call %s, Missing request attribute: %s for method parameter type[%s]", methodName, name, paramType));
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(RequestAttribute.class);
    }

    private class RequestAttributeNamedValueInfo extends NamedValueInfo {
        private RequestAttributeNamedValueInfo() {
            super("", false, null);
        }

        public RequestAttributeNamedValueInfo(RequestAttribute annotation) {
            super(annotation.value(), annotation.required(), null);
        }
    }

}
```

接下来就要在spring的配置文件中添加配置了


​    
```xml
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
    <property name="customArgumentResolvers">
        <list>
            <bean class="path to RequestAttributeMethodArgumentResolver" />
        </list>
    </property>
</bean>
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping"></bean>
```


不同的工程配置方式可能有点不一样，但是大同小异都差不多

