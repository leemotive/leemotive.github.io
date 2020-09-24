# link

在一个包开发过程中，常常需要被别的项目依赖，和别的项目中整合在一起进行测试。比如webpack的插件等，这个时候总不能先发布，然后再别的项目里面 install 这个包，这样太不方便了。这个时候link就派上用场了



在包目录下执行 `npm link` 或者 `yarn link` 

在项目目录下执行 `npm link name` 或者 `yarn link name` 就可以了



这个时候有可能会出现构建时找不到包所依赖的那些库，提示需要安装这些库，但是这些库在我的包里面已经安装过了，按道里不应该啊。后来才发现这是webpack构建参数 resolve 导致的，只需要将包目录下的 `node_modules` 目录添加到 webpack 的配置文件中的`resovle.modules` 数组中去，就可以正常构建了