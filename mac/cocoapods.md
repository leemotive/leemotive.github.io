# CocoaPods

再使用pod install的时候会去 https://github.com/CocoaPods/Specs.git拉取代码，奈何速度奇慢  
改善方法是使用国内镜像https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git  
清华的这个镜像还蛮好用的  
```
cd ~/.cocoapods/repos 
pod repo remove master
git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git  master
```

需要在PodFile中再设置一下源
```
source  'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
```
 
