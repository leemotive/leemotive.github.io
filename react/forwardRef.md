# ref实现及forwardRef传递多个ref

在react中可以有三种方式使用ref,`字符串`，`函数方式`，`对象方式`

```javascript
class A extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
  }
  render() {
    // 对象方式
    // this.nameRef.current获取Child组件实例
    return <Child ref={this.nameRef} />
  }
}
```
或者删除constructor中的createRef操作,通过下面两种方式设置ref
```javascript
// 字符串方式
// 通过this.refs.nameRef获取Child组件实例
return <Child ref="nameRef">
```
```javascript
// 函数方式
// 通过this.nameRef获取Child组件实例
return <Child ref={ins => this.nameRef = ins}>
```

对于字符串方式的ref设置，也是通过react代码中的`coerceRef`方法转化为函数方式
```javascript
// created是创建出来的Fiber对象
created.ref = coerceRef(returnFiber, null, newChild);
```
```javascript
// coerceRef中的部分代码
const ref = function(value) {
  let refs = inst.refs;
  if (refs === emptyRefsObject) {
    // This is a lazy pooled frozen object, so we need to initialize.
    refs = inst.refs = {};
  }
  if (value === null) {
    delete refs[stringRef];
  } else {
    refs[stringRef] = value;
  }
};
ref._stringRef = stringRef;
return ref;
```
可见在`coerceRef`的一个重要工作就是返回一个函数，在函数内将执行`refs[stringRef] = value`

最后在`commitLayoutEffects`中会调用`commitAttachRef`进行关联

```javascript
// commitAttachRef的部分代码
if (typeof ref === 'function') {
  // 函数方式就是执行函数进行绑定
  ref(instanceToUse);
} else {
  // 对象方式直接对current进行赋值
  ref.current = instanceToUse;
}
```
当然有`commitAttachRef`就有`commitDetachRef`
```javascript
function commitDetachRef(current) {
  var currentRef = current.ref;
  if (currentRef !== null) {
    if (typeof currentRef === 'function') {
      currentRef(null);
    } else {
      currentRef.current = null;
    }
  }
}
```

当然在ref是不可以用在`FunctionComponent`类型中的，在DEV版本的使用的话，也是会有错误提示的
```javascript
'Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?'
```
提示也相当友好，指明可以使用forwardRef，这也正是forwardRef的用处，
```javascript
function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}
```
forwardRef的代码是特别简单，就返回一个对象，使用方法如下
```javascript
const ForwardChild = React.forwardRef(Child);

// 调用处
<ForwardChild ref={this.childRef} />
```
如此便不会报错，那这个时候`childRef`就是指向谁的呢。指向谁需要在Child组件中定义

在React构建Fiber树的过程中，处理到FowardChild这个节点的时候，会认出这个Fiber的tag是11也就是`ForwardRef`，就会进入`updateForwardRef`方法进行处理
```javascript
// updateForwardRef中的一行代码调用
// render就是调用forwardRef传入的函数，在forwardRef返回的对象中的key就是render
// ref就是在使用ForwardChild的传入的
nextChildren = renderWithHooks(current, workInProgress, render, nextProps, ref, renderExpirationTime);


// renderWithHooks
// Component就是传进来的render, secondArg就是传进来的ref
// 真正的执行我的Child组件，并传入了代码中给ForwardChild设置的ref
var children = Component(props, secondArg); 
```
在Child组件中只需要正常使用这个ref就可以了

```javascript
function Child(props, ref) {
  return <input ref={ref} />
}
```
Child如此定义，那我们在ForwardChild组件处设置的this.childRef就指向了这个input元素。Child组件也成功向外提供一个ref

如果Child内有多少元素需要向外提供ref又怎么办呢？
```javascript
function Child(props, ref) {
  return (
    <>
      <input ref={ref('name1')} />
      <input ref={ref('name2')} />
    </>
  )
}
```
所以这里只要保证`ref('name1')`和`ref(name2)`返回的是一个可以正常使用ref函数

在调用的时候需要作如下处理
```javascript
class A extends Component {
  getRef = (name) => {
    return ins => this[name] = ins;
  }
  render() {
    return <ForwardChild ref={this.getRef} />
  }
}
```
这样在A组件内就可以通过`this.name1`和`this.name2`获取Child组件内的两个input元素了

