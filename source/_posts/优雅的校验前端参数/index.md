---
title: 优雅的校验前端参数
author: 柚子816
toc: true
comment: true
date: 2024-07-25 16:37:04
tags:
  - validate
category: Java
cover: ./cover.jpg
---

好吧，我承认我是标题党了，这个事情对于后端同学应该算是基本操作了，但我却是这两天才知道的，记录一下，以后可能还会要用到

## 接收参数

```java
// ExampleController.java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/example")
public class ExampleController {
  
  @PostMapping
  public ResponseEntity exampleQuery(@RequestBody ExampleVo exampleVO) {
    // 业务逻辑
  }
}


// ExampleVo.java
public class ExampleVo {
  private String password;
  private String password1;
  // 省略 getter setter 方法
}
```



在前端发起请求后，并在请求体中提供 `password, password1` 那在 `exampleQuery` 方法参数exampleVO中接收到前端发来的参数。但是业务要求 password和 password1不能为空，并且值要相等。那这样的参数样就应该怎么写呢。最直接的方法当前是直接在 exampleQuery 中先判断，然后执行真正的业务逻辑。像下面这样

```java
// class 定义相关的代码省略，只展示方法相关的代码
@PostMapping
public ResponseEntity exampleQuery(@RequestBody ExampleVo exampleVO) {
  if (exampleVO.getPassword() == null || !exampleVO.getPassword().equals(exampleVO.getPassword1())) {
    // 校验失败, 抛出相对应的异常，
    // 如果要更细致的出错信息提示，那校验还要分开写
  }
  // 业务逻辑
}
```

这还是相对简单的校验逻辑，如果逻辑稍微复杂一点，这种在方法一开始进行参数校验的写法，会导致代码不够清晰，随着业务发展，代码也会越来越复杂。那有没有更简单的做法，让 controller 内的方法的关注点集中在业务逻辑，而不是参数合法性校验 



##  spring-boot-starter-validation

我的项目使用的是 springboot，所以引用了 [spring-boot-starter-validation](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-validation) 来进行参数的校验，在添加了这个依赖之后，只需要添加几个注解就可以完成参数校验功能了

```java
import jakarta.validation.constraints.NotEmpty;

public class ExampleVo {
  @NotEmpty
  private String password;
  @NotEmpty
  private String password1;
  // 省略 getter setter 方法
}
```

通过`@NotEmpty` 来标记这个属性是非空的。如果前端没传对应的参数，项目会抛出异常。同时还要在 Controller 内的方法里添加 `@validated` 注解让校验生效

```java
import org.springframework.validation.annotation.Validated;

// class 定义相关的代码省略，只展示方法相关的代码
@PostMapping
public ResponseEntity exampleQuery(@Validated @RequestBody ExampleVo exampleVO) {
  // 业务逻辑
}
```

通过上面的代码，就已经保证参数非空了。那如何判断 password 和 passwork1 是否相等。这种在属性上添加注解的方式，只能校验当前这个属性，而无法做到和其它属性联动判断



## 自定义注解

内置的注解功能有限，可以在项目中自定义一个注解，完成更加个性化的验证

```java
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SameAsValidator.class)  // 使用 SameAs 这个注解时，要调用哪个类完成校验功能
public @interface SameAs {
    String field1();  // 需要对比的属性名1
    String field2();  // 需要对比的属性名2
    String[] names();	// 两个属性的名称，后面会填充到错误消息中
    String message() default "%s和%s需要保持一致";  // 错误消息模板
  
		// 下面两个不用管，想了解可以查看内置的注解这两个功能怎么用
    Class<?>[] groups() default {};  
    Class<? extends Payload>[] payload() default {};
}
```

定义一个校验实现类

```java
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.collections4.MapUtils;

import java.util.Map;
import java.util.Objects;
// 这个注解是准备直接用在类上的，由于可以使用在不同类上，所以泛型上使用 Object 校验值
// 如果知道这个注解明确应用到什么类型上的。那可以直接使用 String 等具体的类型
public class SameAsValidator implements ConstraintValidator<SameAs, Object> {

    private String field1;
    private String field2;
    private String[] names;
    private String message;

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
      	// 把要校验的对象转换成 map 对象，方便获取要校验的属性的值
        Map map = JsonHelper.toMap(value);
        // 判断对应的两个属性值是否相等
        boolean valid = Objects.equals(MapUtils.getObject(map, this.field1), MapUtils.getObject(map, this.field2));
        if (!valid) {
          	// 禁用默认的消息内容
            context.disableDefaultConstraintViolation();
          	// 使用 names 中两个名字填充到消息模板中，并通过 addPropertyNode 把这个错误绑定到某个属性上
            context.buildConstraintViolationWithTemplate(String.format(this.message, names[0], names[1])).addPropertyNode(this.field2).addConstraintViolation();
        }
        return valid;
    }

    @Override
    public void initialize(SameAs constraintAnnotation) {
      	// 需要把注解的信息保存过来，校验方法里要用的，或者直接保这个注解对象也可以
        this.field1 = constraintAnnotation.field1();
        this.field2 = constraintAnnotation.field2();
        this.names = constraintAnnotation.names();
        this.message = constraintAnnotation.message();
    }
}

```



## 如何使用

自定义注解完成之后，需要像内置注解一样应用到项目中

```java
import jakarta.validation.constraints.NotEmpty;

// 限制两个字段的属性分别是 password, password1 两个属性名称的顺序看看消息模板怎么写
@SameAs(field1 = "password", field2 = "password1", names = {"确认密码", "密码"})
public class ExampleVo {
  @NotEmpty
  private String password;
  // password非空，又有两个字段相同，那 password1就没必要限制非空了
  private String password1;
  // 省略 getter setter 方法
}
```

经过在类上使用注解，就会自动触发对应的校验逻辑

> 建议
>
> 注解只有用在类上，在校验时才能获取到完成的对象，完成更加复杂的校验功能。外行只能想到这些了，如果有专业 Java 有更好的办法欢迎留言告知一下



----



有了这些注解，可以更好的完成参数校验功能，对于一些复杂的校验功能，比如一个属性取某个值的时候，另一个属性只能取哪些固定值，这种相互有限制的校验。这样就完全可以把校验逻辑分离出去。而在 controller 中更好的去处理业务的逻辑



在使用了这些注解校验之后，项目会抛出一些异常，常见的异常类型有

```
org.springframework.validation.BindException;
jakarta.validation.ConstraintViolationException;
org.springframework.web.bind.MissingServletRequestParameterException; 
```

在全局的异常处理方法中，当前处理到这些异常的时候，可以从异常对象获取到异常信息，比如哪个属性，错误消息等，按照项目规范组合好返回给前端进行提示。
