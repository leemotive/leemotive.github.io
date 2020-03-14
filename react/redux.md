# redux

redux通过维护一个单一的数据源currentState，通过subscribe方法添加一个回调函数listener，用dispatch方法发送一个action，触发reducer计算更新数据源，并遍历调用listener通知所有订阅方

## createStore
创建并返回一个store
```javascript
export default function createStore(reducer, preloadedState, enhancer) {
  // 参数类型各种判断，省略

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    // 如果enhancer是函数，内部其实是包装dispatch，使用redux过程，enhancer也就是applyMiddleware方法返回的函数
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentReducer = reducer
  let currentState = preloadedState as S
  let currentListeners: (() => void)[] | null = []
  let nextListeners = currentListeners
  let isDispatching = false

  // 这个方法就是保证在遍历listners的过程中，不会通过subscribe或者unsubscribe改变listners,对当前遍历产生影响 
  function ensureCanMutateNextListeners() {}
  // 一堆store上要暴露出去的api函数的定义，对state，listeners，及reducer操作的函数
  function getState() {}
  function subscribe() {}
  function dispatch() {}
  function replaceReducer() {}
  function observable() {}

  // 看参数，这个初始化
  dispatch({type: ActionTypes.INIT})

  const store = ({
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  });

  return store
}
```


## subscribe
有了store先需要通过subscribe注册listener
```javascript
function subscribe(listener) {
  // 忽略一些预判断代码
  let isSubscribed = true

  ensureCanMutateNextListeners()
  // 主要语句，就是将参数listener添加到回调函数列表里面，等待下一次数据更新时被遍历调用
  nextListeners.push(listener)

  // 返回一个取消订阅方法
  return function unsubscribe() {
    // 忽略一些预判断代码
    isSubscribed = false

    ensureCanMutateNextListeners()
    const index = nextListeners.indexOf(listener)
    // 找到回调函数列表里找到订阅listener，并将之移除
    nextListeners.splice(index, 1)
    currentListeners = null
  }
}
```

## dispatch
有了订阅之后，可以通过dispatch方法发送一个action
```javascript
function dispatch(action) {
  // 忽略一些预判断代码
  try {
    isDispatching = true
    // 通过currentReducer根据currentState及参数action计算出新的state
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  // 遍历回调函数列表，逐一调用listener
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }

  return action
}
```

## getState
被通知有数据更新后，需要获取最新的state
```javascript
function getState() {
  // 忽略一个预判断代码
  // 直接返回存储数据的变量
  return currentState;
}
```

## replaceReducer
在当前reducer不满足要求时，通过此api来更换reducer
```javascript
function replaceReducer() {
  // 简单的赋值替换
  currentReducer = nextReducer;

  // 触发一个内部action
  dispatch({
    type: ActionTypes.REPLACE
  });
  // store返回，其实也没有什么变更
  return store;
}
```

## observable
另外一种订阅方式，或者是编程范式，可以参照[tc39/proposal-observable](https://github.com/tc39/proposal-observable)，这个提案还在stage-1阶段

## combineReducers
组合reducer返回一个复合reducer作为createStore的参数，多个reducer联合工作，每个reducer负责state中的一部分，职责更明确，逻辑也会更清晰
```javascript
export default function combineReducers(reducers) {
  // 多个reducers以对象的方式传参进来，key作为这个reducer在数据源对应数据的key值
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    
    if (typeof reducers[key] === 'function') {
      // 就是过滤掉不是函数的reducer，取得有效的reducers
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  // 对每个reducer作一个简的判断，调用看返回值是否合法，无碍，忽略

  // 返回一个复合reducer，作为createStore的参数
  return function combination(state, action) {
    // 一些预判断，如reducer返回值是否正确，及state和reducer的key值是否能正确对应上，忽略
    let hasChanged = false
    const nextState = {}
    // 遍历所有reducer，将其负责的那部分state及action传递进去，计算新state
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        // 新state不可以是undefined，这点在之前其实是有判断的
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      // 新state和旧state通过===来判断是否有变化
      // 这就要求不能在reducer内部直接state内的某个值，而是要返回一个新的state
      // 任何一个state有变化，就标记整体是有变化的
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 如果reducer个数和state的key值个数对应不上也算是整体state有变更
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}
```

## applyMiddleware
应用一些中间件，返回一个enhancer作为createStore的参数，在createStore内部会调用enhancer函数`enhancer(createStore)(reducer, preloadedState)`
```javascript
export default function applyMiddleware(...middlewares) {
  return function(createStore) {
    return function(reducer, ...args) {
      // 相当先避开enhancer创建一个store备用
      const store = createStore(reducer, ...args)
      // 定义了一个只报错的dispatch, 主要是为了在构建中间件过程中不要有dispatch发生
      let dispatch = () => { throw new Error() }

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)
      // 经过上面的遍历及compose过程，调用新的dispatch发送action时，可以在中间件中传递或者拦截

      // 用新复合出来的dispatch代替store.dispatch
      return {
        ...store,
        dispatch
      }
    }
  }
}
```

一个middleware的书写方式
```javascript
// 这是redux-thunk的主要逻辑
function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    // 这个方法就是一个dispatch
    if (typeof action === 'function') {
      // 这里就是拦截，没有调用next,也就最终不会调用到store.dispatch来触发reducer计算
      // 本次dispatch就此终结，需要在action方法内部等待一些操作完成后触发新的dipatch
      return action(dispatch, getState);
    }
    // 通过调用next方法，将action一步一步向后传
    return next(action);
  };
}
```

## bindActionCreator
对action的进一步封装，不用每一次都去构造action，相同类型操作，类型参数每次都一样，在包装函数中去调用dispatch
```javascript
export default function bindActionCreator(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    // 只有一个actionCreator
    return bindActionCreator(actionCreators, dispatch)
  }
  // 类型判断代码，忽略

  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      // 对每一个actionCreator作一次绑定
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```

那这里面的bindActionCreator作用又是在绑定什么呢
```javascript
// 实际就是调用actionCreate创建action，并直接调用dispatch方法
function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    return dispatch(actionCreator.apply(this, args))
  }
}
```
使用demo
```javascript
var store = Redux.createStore(function(state, action) {
    const { count, type } = action;
    if (type === 'add') {
        state = { count: state.count + action.count }
    } else if (type === 'minus') {
        state = { count: state.count - action.count }
    }
    return state;
}, {count: 0})

var operation = Redux.bindActionCreators({
    add: count => ({type: 'add', count}),
    minus: count => ({type: 'minus', count})
}, store.dispatch)

operation.add(10) // 由于有bind自动触发dipatch进行加操作
operation.minus(5) // 触发减操作
```
