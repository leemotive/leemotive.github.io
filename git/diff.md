# diff
对比文件差异

- 不带参数选项的
比较工作区和暂存区中的差别

- 比较工作区和HEAD区别

  ```bash
  $ git diff HEAD
  ```

  

- 比较暂存区和版本库的区别

  ```bash
  $ git diff --staged
  $ git diff --cached
  ```

  

- --word-diff提供逐词比较功能

  ```bash
  $ git diff --word-diff
  ```

- --nameonly 只显示存在差异的文件的路径