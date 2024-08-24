---
title: mapstruct确实蛮好用的
author: 柚子816
toc: true
comment: true
date: 2024-08-23 16:55:45
tags: 
  - mapstruct
category: Java
cover: ./cover.jpg
---

最近在做一个 java 的项目，需要把 dto啊 vo啊 entity啊这些对象进行转换，这些对象很多属性名称及类型都是一样的，甚至是完全一样的。部分属性的类型或者名字有不一致的地方。刚开始准备简单暴力先将源对象转换成 json 字符串，然后再转换成目标对象。反正这两个逻辑早就已经准备好了。完美，简单



## BeanUtils

在 apache 和 spring 中都有 BeanUtils 类，使用其 copyProperties 就可以实现这样的功能

```java
SourceObject source = new SourceObject();
TargetObject target = new TargetObject();
BeanUtils.copyProperties(source, target);
```

这种方式需要手动创建目标对象，然后使用`copyProperties` 进行属性复制

> 使用这种方式的时候，需要保证源对象和目标对象的属性名及类型完全一样。否则无法正常复制。但是在项目里估计也不太会出现源对象和目标对象结构完全一样的情况
>
> BeanUtils.copyProperties 貌似还有一些其它的坑，我没验证过，就不举例了

## mapstruct

这是在刷抖音的时候有个视频博主提到的，我去试了一下，然后就果断使用上了。可以自定义属性名称的映射关系，以及设置默认值或者自定义转换逻辑

```java
// SourceObj.java
@Getter
@Setter
public class SourceObj {
    private Long code;
    private String username;
}

// TargetObj.java
@Getter
@Setter
public class TargetObj {
    private Long code;
    private String name;
}


// Converter.java
// 这是 mapstruct 中的 Mapper 可不是mybatis 中的 Mapper
@Mapper
public interface Converter {
    Converter mapper = Mappers.getMapper(Converter.class);

    TargetObj toTarget(SourceObj sourceObj);
}
```

这样会自动生成 Converter 接口的实现类，也就是 toTarget 的实现

```java
// 这是项目自动生成的
public class ConverterImpl implements Converter {

    @Override
    public TargetObj toTarget(SourceObj sourceObj) {
        if ( sourceObj == null ) {
            return null;
        }

        TargetObj targetObj = new TargetObj();

        targetObj.setCode( sourceObj.getCode() );

        return targetObj;
    }
}
```

可以看到在运行时就是通过 get/set 方法进行属性赋值，但是只生成了 code 属性的赋值过程，由于 name 和 username 名字不一样，并没有生成，面对这种情况，需要通过 Mapping 注解定义属性映射关系

### 属性名映射

```java
@Mapper
public interface Converter {
    Converter mapper = Mappers.getMapper(Converter.class);

    @Mapping(source = "username", target = "name")
    TargetObj toTarget(SourceObj sourceObj);
}
```

通过 Mapping 定义源属性名是 `username`, 目标属性名是 `name` ，而生成的实现代码如下

```java
public class ConverterImpl implements Converter {

    @Override
    public TargetObj toTarget(SourceObj sourceObj) {
        if ( sourceObj == null ) {
            return null;
        }

        TargetObj targetObj = new TargetObj();

        targetObj.setName( sourceObj.getUsername() );
        targetObj.setCode( sourceObj.getCode() );

        return targetObj;
    }
}
```

### 默认表达式

如果源对象的属性为 null 可以通过 `defaultExpression` 来生成默认值

```java
@Mapper
public interface Converter {
    Converter mapper = Mappers.getMapper(Converter.class);

    @Mapping(source = "username", target = "name", defaultExpression = "java( org.example.Converter.class.getName() )")
    TargetObj toTarget(SourceObj sourceObj);
}
```

看下面生成的代码

```java
public class ConverterImpl implements Converter {

    @Override
    public TargetObj toTarget(SourceObj sourceObj) {
        if ( sourceObj == null ) {
            return null;
        }

        TargetObj targetObj = new TargetObj();

        if ( sourceObj.getUsername() != null ) {
            targetObj.setName( sourceObj.getUsername() );
        }
        else {
            targetObj.setName( org.example.Converter.class.getName() );
        }
        targetObj.setCode( sourceObj.getCode() );

        return targetObj;
    }
}
```

可以看到在 `username` 为 `null` 的时候会使用 defaultExpression 中的表达式作为默认值

### 忽略 null

如果源对象中属性值为`null` 取消对目标对象的赋值，可以通过`nullValuePropertyMappingStrategy` 设置

```java
@Mapper
public interface Converter {
    Converter mapper = Mappers.getMapper(Converter.class);

    @Mapping(source = "username", target = "name", defaultExpression = "java( org.example.Converter.class.getName() )")
    @Mapping(source = "code", target = "code", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    TargetObj toTarget(SourceObj sourceObj);

    @Mapping(source = "code", target = "code", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void mapTarget(SourceObj sourceObj, @MappingTarget TargetObj targetObj);
}
```

我在两个方法中都使用了`NullValuePropertyMappingStrategy.IGNORE` 但是只有第二个生效了，且看生成的代码

```java
public class ConverterImpl implements Converter {

    @Override
    public TargetObj toTarget(SourceObj sourceObj) {
        if ( sourceObj == null ) {
            return null;
        }

        TargetObj targetObj = new TargetObj();

        if ( sourceObj.getUsername() != null ) {
            targetObj.setName( sourceObj.getUsername() );
        }
        else {
            targetObj.setName( org.example.Converter.class.getName() );
        }
        targetObj.setCode( sourceObj.getCode() );

        return targetObj;
    }

    @Override
    public void mapTarget(SourceObj sourceObj, TargetObj targetObj) {
        if ( sourceObj == null ) {
            return;
        }

        if ( sourceObj.getCode() != null ) {
            targetObj.setCode( sourceObj.getCode() );
        }
    }
}
```

使用 toTarget 会在方法内部 new TargetObj 而使用 mapTarget 是通过参数传进目标对象。nullValuePropertyMappingStrategy 也只在 mapTarget 中才生效。可能作者认为在toTarget 中构建的targetObj对象属性都是 null, 如果源属性值也是 null，赋不赋值无所谓，但是如果 Target 的属性有默认值，那这种设计其实是不妥的。不过一般这种转换需求场景下属性有默认值的情况也比较少。如果确实有需要，使用mapTarget 的方式去做也可以。

----

Mapping 注解还支持很多属性, `expression`, `constant`, `dateFormat`, `numberFormat`, `constant`，`ignore`......我也没用到，就不写示例了。功能很多很强大

