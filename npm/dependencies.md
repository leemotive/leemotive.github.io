# dependencies

在npm中有多种依赖形式

## dependencies
这里面声明的时生产环境需要依赖的包

## devDependencies
这里面用于声明一些只在开发阶段或者测试时需要依赖的包

## peerDependencies
这主要用来声明自身面向的包的版本，需要用户单独安装包

比如gulp插件声明此插件需要依赖的gulp版本，或者webpack插件需要依赖的webpack版本

## optionalDependencies
这里的声明的依赖是可选，不安装也不会中断项目运行，安装后项目在某方面可能会有所提升

## bundledDependencies
打包依赖，在执行npm pack命令的时候会将这些依赖也打包在结果文件中，这里的依赖需要在dependencies或者devDependencies中已经声明过
