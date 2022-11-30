# v-model

v-model 其实是 value 和 @input 组合的一个语法糖。实际运行时，vue 是会把 v-model 转换为 v-model 和 @input 组合的。可是有一个突然发现 v-model 不生效，但是是使用 value 和 @input 的组合却是可以的。这不是很奇怪



经定位发现是 vue-template-compiler 和 vue 的版本不匹配。vue-template-compile 编译的文件，和 vue 运行时不匹配了，坑爹了