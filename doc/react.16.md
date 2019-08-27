react 16 相关更新详解


1、生命周期（16.4.0）



React16废弃的三个生命周期函数
componentWillMount
componentWillReceiveProps
componentWillUpdate

取而代之的是两个新的生命周期函数
static getDerivedStateFromProps
getSnapshotBeforeUpdate


React的生命周期分为三个阶段：
挂载阶段
更新阶段
卸载阶段

参考文档：https://juejin.im/post/5b6f1800f265da282d45a79a


2、context（16.3.0版本）
全新的 Context API 可以很容易穿透组件而无副作用，其包含三部分：React.createContext，Provider，Consumer。
React.createContext 是一个函数，它接收初始值并返回带有 Provider 和 Consumer 组件的对象；
Provider 组件是数据的发布方，一般在组件树的上层并接收一个数据的初始值；
Consumer 组件是数据的订阅方，它的 props.children 是一个函数，接收被发布的数据，并且返回 React Element；

Context API是React提供的一种跨节点数据访问的方式
const { Provider, Consumer } = React.createContext('Light');


Provider
Provider是需要使用Context的所有组件的根组件。它接受一个value作为props，它表示Context传递的值，它会修改你在创建Context时候设定的默认值。

Consumer
Consumer表示消费者，它接受一个render props作为唯一的children。其实就是一个函数，这个函数会接收到Context传递的数据作为参数，并且需要返回一个组件。


涉及一些 Consumer封装 
参考文档：https://juejin.im/post/5ac598916fb9a028ca53333c


3、React.createRef

何时使用 Refs
下面是几个适合使用 refs 的情况：
管理焦点，文本选择或媒体播放。
触发强制动画。
集成第三方 DOM 库。
避免使用 refs 来做任何可以通过声明式实现来完成的事情。

参考文档： https://zh-hans.reactjs.org/docs/refs-and-the-dom.html


4、代码分割

React.lazy() 提供了动态 import 组件的能力，实现代码分割。
Suspense 作用是在等待组件时 suspend（暂停）渲染，并显示加载标识。
目前 React v16.6 中 Suspense 只支持一个场景，即使用 React.lazy() 和 实现的动态加载组件。
import React, {lazy, Suspense} from 'react';
const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}



5、更强的错误处理机制
新增了组件生命周期的componentDidCatch方法：
我们可以新建一个错误处理的Component来处理react运行时的异常：

import React, { Component } from 'react';
class ErrorHandler extends Component {
  constructor(props) {
    super(props); 
    this.state = { error: false };
  }
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }
  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}
module.exports = ErrorHandler;


如何使用这个ErrorHandler组件有两种方式：
1) 包裹在页面根组件上，这样所有子组件发生异常时都会被这个组件捕获，在捕获异常的同时我们可以给与用户更友好的错误提示：
render() {
    return (
        <ErrorHandler>
             <Main />
         </ErrorHandler>
    );
}

2) 自定义错误可能发生的情况，以局部组件为例：
我们将ErrorHandler包裹在Recommend上：
render() {
    // <Main>
     return (
         <ErrorHandler><Recommend /></ErrorHandler>
     );
}


在ErrorHandler捕获到错误之后会采用错误的UI显示或者直接赋值为null，来保证页面其余的UI正常的加载

6、render 支持返回数组和字符串
// 不需要再将元素作为子元素装载到根元素下面
render() {
  return [
    <li/>1</li>,
    <li/>2</li>,
    <li/>3</li>,
  ];
}



7、Fragment

render() {
  return (
    <Fragment>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </Fragment>
  );
}



8、Hooks（16.8）
Hooks 要解决的是状态逻辑复用问题，且不会产生 JSX 嵌套地狱，其特性如下：
多个状态不会产生嵌套，依然是平铺写法；
Hooks 可以引用其他 Hooks；
更容易将组件的 UI 与状态分离；
Hooks 并不是通过 Proxy 或者 getters 实现，而是通过数组实现，每次 useState 都会改变下标，如果 useState 被包裹在 condition 中，那每次执行的下标就可能对不上，导致 useState 导出的 setter 更新错数据。

State Hook

Effect Hook

useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。（我们会在使用 Effect Hook 里展示对比 useEffect 和这些方法的例子。）
