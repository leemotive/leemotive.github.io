# meta

以下是从淘宝网复制过来的meta标签

```html
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">
<meta name="spm-id" content="a21bo">
<meta name="description" content="淘宝网 - 亚洲较大的网上交易平台，提供各类服饰、美容、家居、数码、话费/点卡充值… 数亿优质商品，同时提供担保交易(先收货后付款)等安全交易保障服务，并由商家提供退货承诺、破损补寄等消费者保障服务，让你安心享受网上购物乐趣！">
<meta name="aplus-xplug" content="NONE">
<meta name="keyword" content="淘宝,掏宝,网上购物,C2C,在线交易,交易市场,网上交易,交易市场,网上买,网上卖,购物网站,团购,网上贸易,安全购物,电子商务,放心买,供应,买卖信息,网店,一口价,拍卖,网上开店,网络购物,打折,免费开店,网购,频道,店铺">
```

meta常用属性如下
1. charset(HTML5新增属性)
2. name
3. http-equiv
4. content

## charset  
  规定编码方式
  ```html
  <meta charset="utf-8">
  ```
## name  
  用于指定些meta要描述什么信息，如果上面淘宝的meta里面的keywors，description等
## http-equiv  
  其作用相当于http请求的首部信息
  ```html
  <meta http-equiv="expires" content="Sat, 22 Feb 2020 12:23:03 GMT">
  ```

  设置页面显示的窗口方式，如页面以独立的窗口展示，防止被别人在框架里嵌套
  ```html
  <meta http-equiv="Window-target" content="_top">
  ```
  其中content可以设置为`_top`，`_blank`，`_parent`，`_self`。含义和target对应的类似

  
