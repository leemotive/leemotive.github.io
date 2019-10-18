# sudoers

遇到提示 xxx is not in the sudoers file. This incident will be reported
说明当时不支持使用sudo命令

解决方法如下
1. 切换到root用户，或者有sudo使用权限的用户
2. 找到root ALL=(ALL) ALL, 在下面添加一行 xxx ALL=(ALL) ALL

