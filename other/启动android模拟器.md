# 启动android模拟器

https://exerror.com/solved-qemu-system-x86_64-failed-to-initialize-hax-operation-not-supported-by-device-in-big-sur/



在目录 `/Users/:username/Library/Android/sdk/emulator/qemu/darwin-x86_64` 下创建文件 `entitlements.xml` 文件内容

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.hypervisor</key>
    <true/>
</dict>
</plist>
```

然后执行命令

```bash
codesign -s - --entitlements entitlements.xml --force qemu-system-x86_64
```

