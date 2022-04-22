# tail

tail -f 高亮关键字
```bash
tail -f xxx.log | perl -pe 's/(keyword)/\e[1;31m$1\e[0m/g'  
```



多个关键词

```bash
tail -f sys.log | perl -pe 's/(关键词1)|(关键词2)|(关键词3)/\e[1;颜色1$1\e[0m\e[1;颜色2$2\e[0m\e[1;颜色3$3\e[0m/g' 

tail -f sys.log | perl -pe 's/(DEBUG)|(INFO)|(ERROR)/\e[1;34m$1\e[0m\e[1;33m$2\e[0m\e[1;31m$3\e[0m/g' 
```

