# https

nginx配置https要用到私钥key文件和crt证书文件，申请证书文件的时候需要csr文件，openssl命令可以生成key文件和csr证书文件

```shell
$ openssl req -new -newkey rsa:2048 -sha256 -nodes -out example_com.csr -keyout example_com.key -subj "/C=CN/ST=ShenZhen/L=ShenZhen/O=Example Inc./OU=Web Security/CN=example.com"
```

- C: Country, 单位所在国家，各国家的两位数的缩写
- ST: State/Province, 单位所在州或省
- L: Locality, 单位所在城市/或县区
- O: Organization, 此网站单位名称
- OU: Organization Unit, 下属部门名称，也常用用于显示其他证书相关信息，如证书类型，证书产品名称或者身份验证类型或者验证内容
- CN: Common Name, 网站的域名


生成csr文件后，提供给CA机构， 签署成功后，会得到crt文件，crt文件和key文件可用于nginx配置https服务

```nginx
server {
  #ssl参数
  listen              443 ssl;
  server_name         example.com;
  #证书文件
  ssl_certificate     example.com.crt;
  #私钥文件
  ssl_certificate_key example.com.key;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers         HIGH:!aNULL:!MD5;
}
```


各种文件的生成都可以在[中国数字证书提供的免费在线SSL证书工具](https://www.chinassl.net/ssltools/)中完成
