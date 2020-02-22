# doctype

- <!doctype> 声明必须是HTML文件的第一行，位于标签\<html\>之前
- <!doctype> 声明不是HTML标签，它只是告诉浏览器页面是使用哪个HTML版本进行编写
- 没有结束标签
- 大小写不敏感
- HTML4.01基于SGML，doctype声明需要引用DTD，DTD规定了标记语言的规则，这要浏览器才能正确渲染内容
- HTML5不再基于SGML, 不需要引用DTD，但是需要doctype来规范浏览器的行为

HTML4.01中有3个不同DTD声明

- Strict
    ```html
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" 
    "http://www.w3.org/TR/html4/strict.dtd">
    ```
    包含所有HTML元素和属性，不包括展示性的和弃用的元素，也不允许框架集使用

- Transitional
    ```html
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
    "http://www.w3.org/TR/html4/loose.dtd">
    ```
    包括展示性和弃用的元素，不允许使用框架集

- Frameset
    ```html
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" 
    "http://www.w3.org/TR/html4/frameset.dtd">
    ```
    和Transitional一样，但允许使用框架集


可以打开不类型的dtd网址，查看区别
