# android安装证书也不能抓包问题

在res目录下新建一个文件 `network_security_config.xml` 文件内容如下

```xml
<!--能抓https数据包的配置-->
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" overridePins="true" />
            <certificates src="user" overridePins="true" />
        </trust-anchors>
    </base-config>
</network-security-config>
```



在Androidmanifest.xml的application标签中添加以下属性代码

```
android:networkSecurityConfig="@xml/network_security_config"
```



