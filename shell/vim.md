# vim

常用配置.vimrc
```
execute pathogen#infect()
set number

filetype plugin indent on
set autoindent
set smartindent
set tabstop=4
set shiftwidth=4
set softtabstop=4
set expandtab
set mouse=a
syntax enable

set cursorline
set ruler
```

[vim-pathogen](https://github.com/tpope/vim-pathogen)


## 操作
`h,j,k,l` 分别是`左,下,上,右`

`w,b`分别是移动到`下,上`一个单词

普通模式下输入`Shift+zz`可以保存并退出vim。相当于`:wq`

### 进入插入模式
`i`在当前光标处进行编辑

`I，A`分别是在`行首，行末`插入

`a`在光标后插入编辑

`o，O`在当前行`后，前`插入一个新行编辑

`cw，cb`向`后，前`删除一个单词并进入编辑模式

## 文档编辑
文档编辑的所有命令符合一个规律，[操作] + [行号] + [定位]。三个部分完成一个动作

删除的操作代码为`d`，重复`d2d`或者`2dd`(先写行号)表示删除两行，省略数字表示一行

### 删除
`x`反退格键(向后删除)

`X`退格键(向前删除)

`dw`向后删除一个单词，保留普通模式

`db`向前删除一个单词，保留普通模式

`d$`删除当前至行尾

`d^`删除当前至行首

`dG`删除到当前行至文档结尾处

`d1G`删除当前行至文档开始处

`dnG`删除当前行至文档第n行

### 重复命令
`.`重复执行上一个命令







