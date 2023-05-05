---
title: "Map的遍历"
author: 柚子816
toc: true
comment: true
date: 2013-05-27 11:30:00
tags: 
  - java
keywords:
  - Map
  - 遍历
category: java
cover: 
---

昨天写代码的时候遇到一个问题：

有如下Map，`Map<String,List<String>>`

对某个字符串，判断在map的哪个字符串list里，然后返回对应的key

首先想到是对map进行遍历，然后就懵了，从没有遍历过Map

后来上网查了一下，并查阅java的API，作出如下整理

查阅API得知Map提供了如下两个方法

`Set<K> keySet()` 返回此映射中包含的键的Set视图

`Set<Map.Entry<K, V>> entrySet()` 返回此映射中包含的映射关系的Set视图

对Map的遍历就着落在这两个方法上面了

先建一个Map然后对其进行遍历


​    
```java
Map<String, String> map = new HashMap<String, String>();
map.put("key1", "value1");
map.put("key2", "value2");
map.put("key3", "value3");
```

第一种遍历方法，也是最自然的想法，如果可以得到所有的键值的数组或者list，对键值遍历，这个时候就可以通过键的值，调用get(Object
key)方法获得对应的值了,代码如下


​    
```java
public void traversalMap(Map<String, String> map){
        Set<String> set = map.keySet();
        Object[] keys = set.toArray();
        for(Object key : keys){
            System.out.println("key: " + key + ", value: " + map.get(key));
        }
}
```

输出结果：

key: key3, value: value3  
key: key2, value: value2  
key: key1, value: value1

然而这样似乎有些繁琐，既然通过Set<String> set = map.keySet(); 已经的到键的set，何不直接遍历，如下


​    
```java
public void traversalMap(Map<String, String> map){
        Set<String> set = map.keySet();
        for(String key : set){
            System.out.println("key: " + key + ", value: " + map.get(key));
        }
}
```

结果一样，输出所有键值对，这是对set直接用for进行遍历

当然也可以用Iterator进行遍历，如下


​    
```java
public void traversalMap(Map<String, String> map){
        Iterator<String> iterator = map.keySet().iterator();
        while(iterator.hasNext()){
            String key = iterator.next();
            System.out.println("key: " + key + ", value: " + map.get(key));
        }
}
```

下面是通过Set<Map.Entry<K, V>> entrySet() 方法完成对map的遍历


​    
```java
public void traversalMap(Map<String, String> map){
        Set<Map.Entry<String, String>> mapEntry = map.entrySet();
        Iterator<Map.Entry<String, String>> it = mapEntry.iterator();
        while(it.hasNext()){
            Map.Entry<String, String> entry = it.next();
            System.out.println("key: " + entry.getKey()
				 + ", value: " + entry.getValue());
        }
}
```

这里entrySet() 得到一个Set<Map.Entry<K, V>> 类型的set，然后通过Iterator对此set进行遍历

当然也可以直接采用for进行遍历


​    
```java
public void traversalMap3(Map<String, String> map){
        for(Map.Entry<String, String> entry : map.entrySet()){
            System.out.println("key: " + entry.getKey()
  				 + ", value: " + entry.getValue());
        }
}
```

和上面是类似的。

对于Map的遍历，大概就整理这些

