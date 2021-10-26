# 生成JRE目录

新版的安装完成后没有jre目录，在 JAVA_HOME 目录执行以下命令来手动生成

```bash
bin/jlink --module-path jmods --add-modules java.desktop --output jre
```

