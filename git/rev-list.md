- 从版本库中查看累计有多少次提交了

  ```bash
  $ git rev-list HEAD | wc -l
  ```

  

- 在版本号前面加上`^`,表示要排队这个版本及历史版本

  ```bash
  $ git rev-list --pretty=oneline ^dev test
  ## 等价方法
  $ git rev-list --pretty=oneline dev..test
  ```

  

- 三点表示法排除两个版本都能访问到的历史

  ```bash
  $ git rev-list --pretty=oneline dev...test
  ```

  

- 排除自身的历史提交^@

  ```bash
  $ git rev-list --pretty=oneline dev^@
  ```

  

- 提交本身，不包含历史提交^!

  ```bash
  $ git rev-list --pretty=oneline dev^!
  ```

  

