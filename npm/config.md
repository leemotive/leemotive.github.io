# config

## 配置仓库地址

```bash
$ npm config set registry 私有仓库地址
```

一般来讲私有仓库内发布的库会发布在私有域下，比如 babel 的库都在 @babel 下页面，即便在公司私有仓库下里也应该建立一个单独的域，这样设置仓库地址的时候只需要针对这个域设置就好

```bash
$ npm config set @company:registry 公司私库地址
```





## Puppeteer 安装配置

避免安装过慢，可以从国内镜像下载

```bash
# ~/.bashrc
export PUPPETEER_DOWNLOAD_HOST=https://npm.taobao.org/mirrors
```

或者

```ini
# ~/.npmrc
puppeteer_download_host=https://npm.taobao.org/mirrors
```

