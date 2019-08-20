
### React Hooks


首先让我们看一下一个简单的有状态组件：

```

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

我们再来看一下使用hooks后的版本：

```

import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

复用有状态的组件的方案：
+ 1、高阶组件（Higher-Order Components）
+ 2、渲染属性（Render Props）

##### 高阶组件（Higher-Order Components）
```
高阶组件这个概念很好理解，说白了就是一个函数接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件。看下面的代码示例，withUser函数就是一个高阶组件，它返回了一个新的组件，这个组件具有了它提供的获取用户信息的功能。

const withUser = WrappedComponent => {
  const user = sessionStorage.getItem("user");
  return props => <WrappedComponent user={user} {...props} />;
};

const UserPage = props => (
  <div class="user-container">
    <p>My name is {props.user}!</p>
  </div>
);

export default withUser(UserPage);
```

##### renderProps

> 状态与 UI 的界限会越来越清晰

```
function App() {
  const [count, setCount] = useCount();
  return <span>{count}</span>;
}

```

我们知道 useCount 算是无状态的，因为 React Hooks 本质就是 renderProps 或者 HOC 的另一种写法，换成 renderProps 就好理解了：

```

<Count>{(count, setCount) => <App count={count} setCount={setCount} />}</Count>;

function App(props) {
  return <span>{props.count}</span>;
}

```


#### 参考文档

[一篇看懂 React Hooks](https://zhuanlan.zhihu.com/p/50597236)
[30分钟精通React今年最劲爆的新特性——React Hooks](https://segmentfault.com/a/1190000016950339)
【]
