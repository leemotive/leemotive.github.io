# zip

在js中操作zip文件，推荐[JSZip](https://stuk.github.io/jszip/), 简单易用，目录文件操作也够灵活

使用时注意`compression`选项需要设置成`DEFLATE`,默认是`STORE`不产生压缩效果，这会造成压缩后的体积大以及java端可能无法正常解压的问题

.file(name, data, [,iptions])不仅可以用来创建一个文件，还可以用来创建一个符号链接
```javascript
zip.file("link.txt", "file.txt", {
  unixPermissions: parseInt("120755", 8)
});
```
注意生成文件时需要添加`{platform:"UNIX"}`这个选项

同时推荐[ZipStream](https://www.archiverjs.com/zip-stream)

以及[archiver](https://www.archiverjs.com/)
