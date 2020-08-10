# tag

#### 获取在特定commitid上所有的tag

`git tag --points-at <commit-id>`



#### 获取创建tag的时间

`git tag -l --sort=-creatordate --format='%(creatordate):  %(refname:short)'`



