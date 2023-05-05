---
title: "Excel列数与对应字母的转化"
author: 柚子816
toc: true
comment: true
date: 2013-04-08 15:04:00
tags: 
  - excel
keywords:
  - 列数
  - 列号
  - 字母
  - 列标
category: Java
cover: 
---

最近遇到这样个问题，将数据写进Excel文档中，在插入公式的时候希望得到某列对应的字母，如给第一列对应'A'，第52列对应'AZ'

现将代码贴出，后面待用


​    
```java
public String getExcelColumnLetter(int column){
    String columnLetter = "";
    while(column > 26){
        int remainder = column % 26;
        if(0 == remainder){
            columnLetter = (char)(64+26) + columnLetter;
            column=(column-26)/26;
        }else{
            columnLetter = (char)(64+remainder) + columnLetter;
            column=(column-remainder)/26;
        }
    }
    columnLetter = (char)(64+column) + columnLetter;
    return columnLetter;
}
```

这段代码列数是是从1开始的。

另外在网上看见一段相同功能的代码，相比更加简洁一点


​    
```java
public static String getExcelLabel(int index) {
    String rs = "";
    do {
        index--;
        rs = ((char) (index % 26 + (int) 'A')) + rs;
        index = (int) ((index - index % 26) / 26);
    } while (index > 0);
    System.out.println(rs);
    return rs;
}
```

上面这两段代码未对传入的参数做判断，如果传入负数就悲催了，等着返回各种字符吧。需要的时候可以在函数开始处添加判断语句。

完成这段代码之后又没事写了个从字母到列数的函数，也贴出来吧


​    
```java
public int getExcelColumnIndex(String columnLetter){
    if(columnLetter == null || !columnLetter.matches("[a-zA-Z]+")){
        return -1;
    }
    columnLetter = columnLetter.toUpperCase();
    int columnIndex = 0;
    char[] letters = columnLetter.toCharArray();
    for(char let : letters){
        columnIndex = (int)let - 64 + columnIndex*26;
    }
    return columnIndex;
}
```

这段代码对传入的字符串没有大小写的限制，但是必须全是字母组成，否则返回-1。表示字符串不合法。

最后提供一个验证方法

在Excel中某个单元格输入列数对应的字母如A1单元格输入AB，然后在B1单元格输入公式=COLUMN(INDIRECT(A1&3))

这样就可以在B1单元格得到AB列对应的列数28，在excel2007中最大好像只能输入XFD。

倒过来，可以在A2单元格输入列数如28，在B2单元格输入=LEFT(ADDRESS(1,A2,4,1),LEN(ADDRESS(1,A2,4,1))-1)

就可以在B2单元格得到28列对应的列标字母AB了。XFD对应的列数是16384，所以输入的数不要大于16384。

