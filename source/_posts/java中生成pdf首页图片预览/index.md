---
title: "java中生成pdf首页图片预览"
author: 柚子816
toc: true
comment: true
date: 2017-03-19 10:58:00
tags: 
  - pdf
keywords:
  - pdf-renderer
  - 预览
category: java
cover: ./8c308ab9-0d30-45cd-895b-6330539ccdcd.jpeg
---

在项目有上传pdf的需求，然而上传完图片可以在页面上通过img显示上传的图片，于是就想到通过img显示pdf的首页当作预览吧，点击图片再打开新窗口显示完整pdf文件或者直接下载。

[pdf-renderer](http://mvnrepository.com/artifact/org.swinglabs/pdf-
renderer)可以实现此需求


​    
```java
@RequestMapping(value = "/pdf")
public void pdfrender(HttpServletResponse response) throws IOException {

    int pagen = 0;
    File file = new File("E:/pan/example.pdf");

    InputStream inputStream = new FileInputStream(file);
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    StreamUtils.copy(inputStream, byteArrayOutputStream);
    ByteBuffer buf = ByteBuffer.wrap(byteArrayOutputStream.toByteArray());

    PDFFile pdffile = new PDFFile(buf);
    PDFPage page = pdffile.getPage(pagen);
    int width = (int) page.getBBox().getWidth();
    int height = (int) page.getBBox().getHeight();

    Rectangle rect = new Rectangle(0, 0, width, height);

    BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
    Graphics2D bufImageGraphics = bufferedImage.createGraphics();

    Image image = page.getImage(width, height, rect, null, true, true);

    bufImageGraphics.drawImage(image, 0, 0, null);

    ImageIO.write(bufferedImage, "jpg", response.getOutputStream());
}
```

此方法是基于spring框架写的，其中StreamUtils也是spring中的方法

上面方法的pdf文件是以File类型拿到的，如果拿到的就是InputStream，则可跳过FileInputStream转换的过程，如果以其它形式拿到，则先做相应的转化即可。

