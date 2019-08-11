# 插件列表

导出一个vscode已安装的插件的列表
```bash
#!/bin/bash

cd ~/.vscode/extensions
for file in $PWD/*
do
  if test -d $file
  then
    # echo $file
    json=$(cat $file/package.json)
    publisher=$(printf '%s' "$json"| jq -r '.publisher')
    name=$(printf '%s' "$json" | jq -r '.name')
    displayName=$(printf '%s' "$json" | jq -r '.displayName')
    echo - [$displayName]"(https://marketplace.visualstudio.com/items?itemName=$publisher.$name)"
  fi
done
```

在控制台输出一个markdown格式的
