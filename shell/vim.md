# vim

常用配置.vimrc
```
call plug#begin('~/.vim/plugged')
Plug 'preservim/nerdtree'
Plug 'tomasiser/vim-code-dark'
Plug 'pangloss/vim-javascript'
Plug 'leafgarland/typescript-vim'
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'airblade/vim-gitgutter'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'tpope/vim-fugitive'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'editorconfig/editorconfig-vim'
Plug 'Yggdroot/indentLine'
call plug#end()

colorscheme codedark

" Start NERDTree when Vim is started with file arguments.
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() > 0 || exists('s:std_in') | NERDTree | wincmd p | endif

" Exit Vim if NERDTree is the only window remaining in the only tab.
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

let g:airline_powerline_fonts = 1

let g:ctrlp_custom_ignore = 'node_modules\|DS_Store\|.git\|dist\|build\'

filetype plugin indent on

set bs=2
set autoread
set expandtab
set tabstop=2
set shiftwidth=2

set ai
set si
set wrap
set number
```

[vim-pathogen](https://github.com/tpope/vim-pathogen)


## 操作
`h,j,k,l` 分别是`左,下,上,右`

`w,b`分别是移动到`下,上`一个单词

普通模式下输入`ZZ`可以保存并退出vim。相当于`:wq`

### 进入插入模式
`i`在当前光标处进行编辑

`I，A`分别是在`行首，行末`插入

`a`在光标后插入编辑

`o，O`在当前行`后，前`插入一个新行编辑

`cw，cb`删除`下，上`一个单词并进入编辑模式

## 文档编辑
文档编辑的所有命令符合一个规律，[操作] + [行号] + [定位]。三个部分完成一个动作

删除的操作代码为`d`，重复`d2d`或者`2dd`(先写行号)表示删除两行，省略数字表示一行

### 删除
`x`反退格键(向后删除)

`X`退格键(向前删除)

`dw`删除下一个单词，保留普通模式

`db`删除上一个单词，保留普通模式

`d$`删除当前至行尾

`d^`删除当前至行首

`dG`删除到当前行至文档结尾处

`d1G`删除当前行至文档开始处

`dnG`删除当前行至文档第n行

### 重复命令
`.`重复执行上一个命令

### 光标移动
`nG`移动到第n行

`gg`移动到第一行

`G`移动到最后一行

`$`移动到行尾

`^`移动到行首

`e`当前单词词尾

`f字母`向后搜索`字母`，并跳转到第一个匹配的位置

`F字母`向前搜索`字母`，并跳转到第一个匹配的位置


### 复制与粘贴
`yy`复制光标所在行整行（`3yy`表示复制3行）

`y^`或`y0`复制光标到行首或者(不含光标字符)

`y$`复制至行尾(含光标字符)

`yw`复制一个单词

`y2w`复制两个单词

`yG`复制至文本末

`y1G`复制至文本开头

`ynG`复制当前行至每n行

`p`粘贴至光标后

`P`粘贴至光标前

### 翻页
`Ctrl + e`向下滚动一行

`Ctrl + y`向上滚动一行

`Ctrl + f`向下翻一页

`Ctrl + b`向上翻一页

`Ctrl + u`向上翻半页

`Ctrl + d`向下翻半页


### 文件操作
`:e filename`找开新文件

`:r filename`读取文件并插入到当前行

`:f`或者`Ctrl + g`显示当前文件名

`1 + Ctrl + g`会显示全路径

### 分屏启动vim
`vim -on file1 file2...`水平分屏

`vim -On file1 file2...`垂直分屏

### 关闭分屏
`Ctrl + wc`关闭当前窗口（如果是最后一个, 无法关闭）

`Ctrl + wq`关闭当前窗口（如果是最后一个，则退出vim）

### 分屏
`Ctrl + ws`上下分屏

`Ctrl + wv`左右分屏

`:sp filename`左右分屏，且打开一个新的文件

`:vsp filename`上下分屏，且打开一个新的文件

### 切换分屏
`Ctrl + wl`右边

`Ctrl + wh`左边

`Ctrl + wj`上边

`Ctrl + wk`下边





### 无法退格删除

set bs=2 添加到 `.vimrc` 文件中

