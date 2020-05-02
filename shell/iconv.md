# iconv

`$ iconv -f gbk -t utf-8`

比如通过 `curl` 命令获取的网页是 gbk 格式，后续处理可能会有乱码，需要转成 utf-8 再进行后续处理

`$ curl http://www.example.com | iconv -f gbk -t utf-8`;

