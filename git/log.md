# log

语法:
```bash
$ git log [<options>] [<revision range>] [[--] <path>…​]
```

- 显示最近的几条日志`-<n>`, n为数字
    ```bash
    $ git log -3 --pretty=oneline
    ```

- 显示改动
    ```bash
    $ git log -p -1
    ```

- `-p`显示的信息较多，用`--stat`显示概要
    ```bash
    $ git log --stat -1
    ```


- raw显示提交的原始数据，可以显示提交对应的树ID
    ```bash
    $ git log --pretty=raw -1
    ```

- fuller同时显示作者和提交者
    ```bash
    $ git log --pretty=fuller -1
    ```

- oneline提交精简的日志输出

##### --follow
会显示文件在重命名之前的日志（只针对单个文件输出时有效）

##### --no-decorate
##### --decorate[=short|full|auto|no]
定义是否显示及如何显示分支及标签名，也就是`refs/heads/`，`refs/tags/`，`refs/remotes/`这些前缀会不会显示。如果赋值no，不会显示分支及标签名。如果赋值short，这会前缀不显示。如果赋值full，会完整显示这些前缀。如果赋值auto，则在命令终端里，像short一样输出，否则像no一样没有输出(比例在node里面通过exec执行代码)
