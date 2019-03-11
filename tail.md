# tail

tail -f 高亮关键字
```bash
tail -f xxx.log | perl -pe 's/(keyword)/\e[1;31m$1\e[0m/g'  
```
