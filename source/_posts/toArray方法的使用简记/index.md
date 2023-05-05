---
title: "toArray方法的使用简记"
author: 柚子816
toc: true
comment: true
date: 2013-06-28 11:49:00
tags: 
  - java
category: Java
cover: 
---

最近在写代码的时候需要用到的List的toArray方法。可是程序报错了

报错代码大致这样的


​    
```java
public void find(){
    List<String> list = new ArrayList<String>();
    list.add("have");
    list.add("no");
    list.add("problem");
    String[] arr = (String[]) list.toArray();
    for(String str : arr){
        System.out.println(str);
    }
}
```

这里在执行toArray方法时报如下异常

java.lang.ClassCastException: [Ljava.lang.Object; cannot be cast to
[Ljava.lang.String;

起初想，不是加了类型转换了嘛。怎么还……，后来查了一下，将toArray的用法大致整理如下

第一种用法：在toArray方法中添加参数 new String[0]


​    
```java
public void find(){
    List<String> list = new ArrayList<String>();
    list.add("have");
    list.add("no");
    list.add("problem");
    String[] arr = list.toArray(new String[0]);
    for(String str : arr){
        System.out.println(str);
    }
}
```

打印如下结果

have  

no  

problem

第二种用法：仍然是toArray方法添加参数，区别看代码


​    
```java
public void find(){
    List<String> list = new ArrayList<String>();
    list.add("have");
    list.add("no");
    list.add("problem");
    String[] arr = new String[list.size()];
    list.toArray(arr);
    for(String str : arr){
        System.out.println(str);
    }
}
```

仍然打印正确结果，注意的是，这里数组arr的最小长度为list的大小，否则转化结束后，数组arr中全是空值。当然比list的大小还要大，是可以的

第三种方法：不加参数，但是接受toArray方法返回的值变量类型需为Object[]


​    
```java
public void find(){
    List<String> list = new ArrayList<String>();
    list.add("have");
    list.add("no");
    list.add("problem");
    Object[] arr = list.toArray();
    for(Object str : arr){
        System.out.println(str);
    }
}
```

这样也可以打印正确结果

后来发现在数组变量前添加类型转化似乎是行不通的，基本数据类型之间这样转化编译时就报错了

是否还有其他用法有待后面的学习，先大致记录如上

