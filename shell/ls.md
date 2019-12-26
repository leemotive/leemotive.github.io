# ls

- 默认ls输出方向是先纵向再横向输出，个人不是很习惯，这是可以用-x选项调整

`ls -x`

- ls输出的内容比较单调，可以使用[colorls](https://github.com/athityakumar/colorls)美化

- `ls -F` 可以在不同类型文件后添加一个标记
> Display a slash (`/`) immediately after each pathname that is a directory, an asterisk (`*`)
  after each that is executable, an at sign (`@`) after each symbolic link, an equals sign (`=`)
  after each socket, a percent sign (`%`) after each whiteout, and a vertical bar (`|`) after
  each that is a FIFO.

- `ls -R` 可以递归输出子目录内容

- 过滤输出列表
可以在命令行参数之后添加一个过滤器
  - `?` 代表一个字符
  - `*` 代表零个或多个字符
  - [ai] 指定多个字符匹配其中一个
  - [a-i] 匹配字符范围
  - [!a] 将不需要的字符排除出去

