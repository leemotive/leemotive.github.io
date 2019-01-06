# RequestAttribute
通过`@RequestAttribute`获取request中的attribute信息,类似`@RequestParam`从request中获取parameter

```java
package com.example.base.mvc.bind;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequestAttribute {

    String value() default "";
    boolean required() default true;
}
```

```java
package com.example.base.mvc.method;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver;

import com.example.base.mvc.bind.RequestAttribute;

public class RequestAttributeMethodArgumentResolver extends AbstractNamedValueMethodArgumentResolver {


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

配置
```xml
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
    <property name="customArgumentResolvers">
        <list>
            <bean class="com.example.base.mvc.method.RequestAttributeMethodArgumentResolver" />
        </list>
    </property>
</bean>
```
