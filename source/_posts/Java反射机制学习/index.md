---
title: "Java反射机制学习"
author: 柚子816
toc: true
comment: true
date: 2013-04-24 15:43:00
tags: 
  - java
keywords:
  - 反射
  - reflect
  - invoke
category: java
cover: 
---

对于Java中的反射机制，是早有所闻，也略有所知，这两天有时间再来看看Java反射机制，现将这两天所学记录下来，方便以后查询

学习Java反射机制，得先了解一个类——Class。Class类是Java反射的开始，她代表了一个类本身，所以通过类Class可以知道一个类的结构，可以知道这个的所有信息，包括属性，方法等等。

先来看一个最简单的例子

这是一个普通的类，其中的get和set方法省略，四个属性访问权限分别是private，protected，默认，public


​    
```java
public class Car {
    private String name;
    protected String color;
    String model;
    public String brand;
}
```

下面提供一个方法，简单看看利用Java的反射机制实现的功能


​    
```java
public void getNormal(Object obj){
        Class classes = obj.getClass();
        Field[] fields = classes.getDeclaredFields();
        for(Field field : fields){
            try {
                field.setAccessible(true);
                System.out.println(field.get(obj));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
```

该方法以Object作为参数类型，可以接受任何类型的对象，通过此方法可以打印传入对象的所有属性的值。

简单说一下这段代码，

Class classes = obj.getClass();得到一个Class的对象，表示参数对象所属类的本身。

Field[] fields = classes.getDeclaredFields();得到参数对象所有的属性  
System.out.println(field.get(obj));这里面的 field.get(obj) 得到参数对象某属性的值。

如果传入这么一个对象car，其属性分别是name：carName；
color：carColor；model：carModel；brand：carBrand。那么执行这段方法的结果就是输出

carName

carColor

carModel

carBrand

其实在这个例子中完全不需要类Car有get和set方法。

顺便提一下，对于private级别的属性，在没有相应方法的时候，无法直接更改属性值，例如car.name在程序中是编译报错的，而如果利用反射机制，这里与
get 相对应的有 set 方法

set(Object obj, Object value) 将指定对象变量上此 `Field` 对象表示的字段设置为指定的新值。

这个时候不管属性什么访问权限，都可以直接更改对应的值。

这里要提一下field.setAccessible(true)，该方法设置属性是否可见，默认为false，如果不设为ture，那在下面调用field.get(obj)
方法的时候，如果属性的访问权限private，则会抛出异常。在调用set方法的时候也是如此。

通过这个例子已经可以粗略的知道一点Java反射机制了。在运行时动态的操作java对象。

下面就介绍一下在运用反射机制中比较常用的几个方法，其实也不难，参考Java API就可以了

首先是如何获得Class对象，有三种方法

1\. 类名.class

如Car.class

2\. 对象.getClass()  
如上面例子中写的obj.getClass()  
3.Class类的静态方法forName()

Class.forName("java.lang.Stirng");

另外Class类有个方法getSuperClass()，这个方法可以获得代表一个类的父类的的Class对象。Java中8种基本类型的包装类，Integer，Double……，这些包装类有个TYPE属性，也是Class类型，Integer.TYPE和Integer.class不同，通过java的src可知

Integer.TYPE返回的是(Class<Integer>) Class.getPrimitiveClass("int");

在获得的Class对象之后就可以利用Class的各种方法获得属性，方法或者实例化一个对象。

获得属性：


​    
```java
getFields()     //获取public型属性的数组
getField(String name)   //获取指定名字的属性，但是该属性必须为public类型，否则获取不到
getDeclaredFields()    //获取所有级别访问权限的属性的数组，不仅仅是public了
getDeclaredField(String name)    //同样，获取指定名字的属性，也不再限定为public了
```

获得方法


​    
```java
getMethods()
getMethod(String name, Class<?>... parameterTypes)
getDeclaredMethods()
getDeclaredMethod(String name, Class<?>... parameterTypes)
```


和获得属性是一样的，就不多介绍了，其中Class<?>...
parameterTypes指的是方法的参数类型，不传值表示没有参数，有参数就按照顺序一个一个填上。需要指出的这里不包括构造方法。

构造方法有其专门获取构造方法的函数


​    
```java
getConstructors()
getConstructor(Class<?>... parameterTypes)
getDeclaredConstructors()
getDeclaredConstructor(Class<?>... parameterTypes)
```


和普通方法的获取类似

在获得属性或者方法之后就可以进一步获得属性值，或者调用方法

对于属性可以用Field类的

get(Object obj) 返回参数对象上此 `Field` 表示的字段的值。

对于方法可以用Method类的

invoke(Object obj, Object... args) 对带有指定参数的指定对象调用由此 `Method` 对象表示的底层方法。

而对于构造方法不像普通方法那样有invoke方法，这里使用Constructor类newInstance(Object... initargs)

这些算是在使用反射机制最常用的的一些东西了吧。

还有Class类的方法newInstance()方法用来创建一个对象，以及getName，getSimpleName，getSigners，getPackage等方法，在Java
API中都有介绍，需要的时候可以查阅API，这里不做举例介绍

当然Field，Method中也有很多实用的方法，有待深入学习

