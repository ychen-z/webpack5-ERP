import React, { createContext, useContext, useReducer } from 'react';
import { Button } from 'antd';

// 这里我都写在一个文件里面了，实际项目中，Context肯定单独抽象出来
// 所有用到的地方再import进来
const Context = createContext();

// 这里A组件也是，实际项目中肯定不在一个文件里面
const A = () => {
    // 使用优秀的useContext来获取到Context的值
    const { dispatch, state } = useContext(Context);

    return (
        <>
            <Button
                // 如果loading为true，那么禁用button，避免重复点击
                loading={state.loading}
                onClick={() => {
                    // 触发异步action，注意payload里面是一个异步获取方法
                    dispatch({
                        type: 'click_async',
                        payload: asyncFetch(new Date().getTime())
                    });
                }}
            >
                click async
            </Button>
            <Button
                loading={state.loading}
                onClick={() => {
                    // 触发同步action
                    dispatch({
                        type: 'click_sync',
                        payload: new Date().getTime()
                    });
                }}
            >
                click sync
            </Button>
            <pre>{JSON.stringify(state, null, 4)}</pre>
        </>
    );
};

// reducer方法也是，应该有单独的文件去维护
function reducer(state, action) {
    switch (action.type) {
        case 'click_async':
        case 'click_sync':
            return { ...state, value: action.payload };
        case 'loading_start':
            return { ...state, loading: true };
        case 'loading_end':
            return { ...state, loading: false };
        default:
            throw new Error();
    }
}

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

// 这里是mock了一个异步方法，1秒后才会返回结果，模拟请求数据
async function asyncFetch(p) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(p);
        }, 1000);
    });
}

// 这里对dispatch函数进行一个封装，使其支持处理异步action
// 简而言之就是判断传进来的action是不是Promise对象，如果是的话
// 先执行loading_start，将loading置为true
// 然后执行完成Promise后，将获得的结果执行一次action
// 再执行loading_end（实际项目中请求失败也应该执行loading_end，因项目而异，不展开了）
// 注意：这个loading是我项目中喜欢用的一个标志位，用来记录当前是不是处于请求中
// 因为经常需要有如果在请求中，按钮需要禁用，防止用户再点击这种需求
// 另外实际项目中,loading可以扩展成对象，记录各种异步请求的状态
// 这个灵感来源于dva-loading，感谢！
function wrapperDispatch(dispatch) {
    return function(action) {
        if (isPromise(action.payload)) {
            dispatch({ type: 'loading_start' });
            action.payload.then(v => {
                dispatch({ type: action.type, payload: v });
                dispatch({ type: 'loading_end' });
            });
        } else {
            dispatch(action);
        }
    };
}

function App() {
    // 这里通过优秀的useReducer来实现Redux
    const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
    return (
        <>
            {/* 这里把state和包装过的dispatch绑定到Context上去，便于全局获取使用 */}
            <Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
                <A />
            </Context.Provider>
        </>
    );
}

export default App;
