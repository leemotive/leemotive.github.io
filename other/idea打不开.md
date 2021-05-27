# idea 打不开

环境：Mac

软件：IntelliJ IDEA 2021.1.1 (Ultimate Edition)

安装完成后始终打不开，点击后一点反应都没有

通过 `/Applications/IntelliJ IDEA.app/Contents/MacOS/idea` 脚本启动发现是 jetbrains-agent 包找不到

编辑 `/Users/lee/Library/Application Support/JetBrains/IntelliJIdea2021.1/idea.vmoptions` 把里面的对应的脚本行删除就可以。