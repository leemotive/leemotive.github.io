# Puppeteer 

在使用 Puppeteer 的时候，如果是运行在服务器上的，可能会出现启动不了的情况，可以尝试添加启动参数 `--no-sandbox`



有时会出现见面加载不了，但是正常启动浏览器打开网站是可以的。可以尝试添加启动参数 `--disable-blink-features=AutomationControlled`



当服务器对 userAgent 作出一些限制的时候，可能在需要修正 userAgent 才可以访问网页。

```js
async setUserAgent(page) {
  const agent = await page.evaluate(() => navigator.userAgent);
  // 或者通过 browser.userAgent() 来获取
  await page.setUserAgent(agent.replace('HeadlessChrome', 'Chrome'));
}
```

