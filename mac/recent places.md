# recent places

在文档点击`save as`，或者其它方式弹出这类弹窗的时候，会有一项`recent places`,里面显示的是近期使用过的文件夹。如果想清空可以执行
```bash
defaults delete -g NSNavRecentPlaces
```

修改最多记录条数
```bash
defaults write -g NSNavRecentPlacesLimit -int NUM
```
设为0表示直接禁用


下面这个可以删除限制
```
defaults delete -g NSNavRecentPlacesLimit
```

