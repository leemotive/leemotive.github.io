---
title: "银行卡输入四位自动分割"
author: 柚子816
toc: true
comment: true
date: 2016-03-05 17:46:00
tags: 
  - JavaScript
keywords:
  - 银行卡号
  - 自动分割
category: 前端
cover: 
---

遇到这样一个需求，输入框在输入银行卡号的时候，需要每4位自动插入一个空格

以下是实现


​    
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Document</title>  
    <script>  
          
        function getCaretPosition(obj) {  
            var result = 0;  
            if ('selectionStart' in obj) {  
                result = obj.selectionStart;  
            } else {  
                try{  
                    var rng;  
                    if (obj.tagName == "textarea") {  
                        rng = event.srcElement.createTextRange();  
                        rng.moveToPoint(event.x, event.y);  
                    } else {  
                        rng = document.selection.createRange();  
                    }  
                    rng.moveStart("character", -event.srcElement.value.length);  
                    result = rng.text.length;  
                }catch (e){  
                    throw new Error(10,"asdasdasd")  
                }  
            }  
            return result;  
        }  
          
        function setCaretPosition(tObj, sPos){  
            if(tObj && sPos !== undefined){  
                setTimeout(function(){  
                    if(tObj.setSelectionRange){  
                        tObj.setSelectionRange(sPos, sPos);  
                        tObj.focus();  
                    }else if(tObj.createTextRange){  
                        var rng = tObj.createTextRange();  
                        rng.move('character', sPos);  
                        rng.select();  
                    }  
                }, 0);  
            }  
        }  
  
    </script>  
    <script src="./usejQuery/jquery-1.8.2.js"></script>  
    <style type="text/css">  
        input{  
            width: 800px;  
            height: 25px;  
        }  
    </style>  
</head>  
<body>  
    <input id="card" type="text" value="">  
    <script>  
        function autoSplit(ele, size) {  
            var lastValue, posn, divisor, whiteRgx, splitRgx, isBackspace;  
            lastValue = ''  
            whiteRgx = /\s+/g;  
            splitRgx = new RegExp('(\\d{' + size + '})(?!$)', 'g');  
            divisor = size + 1;  
  
            $(ele).on('input propertychange', function (event) {  
                var pos, str, propertyName, length, newValue;  
                str = $(this).val();  
                propertyName = event.originalEvent.propertyName;  
                if (propertyName && propertyName !== 'value' || lastValue == str) {  
                    return ;  
                }  
                pos = getCaretPosition(this);  
                str = str.replace(whiteRgx, '');  
                length = str.length;  
                  
                newValue = str.replace(splitRgx, '$1 ');  
                if (newValue.length <= lastValue.length) {  
                    if (pos % divisor === 0 && isBackspace) {  
                        pos -= 1;  
                    } else if (pos % divisor === size) {  
                        newValue = newValue.split('');  
                        if (!isBackspace) {  
                            newValue.splice(pos + 1, 1);  
                        } else {  
                            newValue.splice(pos - 1, 1);  
                            pos -= 1;  
                        }  
                        newValue = newValue.join('').replace(whiteRgx, '').replace(splitRgx, '$1 ');  
                    }  
                } else if (pos % divisor === 0) {  
                    pos += 1;  
                }  
  
                lastValue = newValue;  
                $(this).val(newValue);  
  
                setCaretPosition(this, pos);  
            });  
  
            $(ele).on('keydown', function (event) {  
                isBackspace = event.keyCode === 8;  
            });  
        }  
  
        autoSplit($('#card'), 4);  
    </script>  
</body>  
</html>
```

此外，在ie8中还有个现象就是，如果把输入框的样式中去掉width或者height，只保留一个，这样会导致input
propertychange事件第一次触发，第二次不触发，第三次触发，第四次不触发……这样隔一次才触发一次。只有样式中width和height都设置后才每次都触发。不清楚什么原因

