# shell

有时候通过命令行安装一些软件或者命令的过程中需要下载一些文件，有时候会特别慢，甚至失败，这种情况有些时候是可以通过设置代理来解决的

```bash
export http_proxy="http://localhost:port"
export https_proxy="http://localhost:port"
```

如果使用的是ss作的代理，可以使用

```bash
export http_proxy="socks5://127.0.0.1:port"
export https_proxy="socks5://127.0.0.1:port"
```
或者
```bash
export ALL_PROXY=socks5://127.0.0.1:port
```
这里面的port根据自己的ss配置调整



使用git的时候有时候也会出现clone很慢的现象可以尝试以下的配置
```bash
git config --global http.proxy 'socks5://127.0.0.1:port' 
git config --global https.proxy 'socks5://127.0.0.1:port'
```




