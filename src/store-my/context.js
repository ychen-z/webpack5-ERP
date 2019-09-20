import { createContext } from 'react';

// reducer方法也是，应该有单独的文件去维护
// function reducer(state, action) {
//     switch (action.type) {
//         case 'click_async':
//         case 'click_sync':
//             return { ...state, value: action.payload };
//         case 'loading_start':
//             return { ...state, loading: true };
//         case 'loading_end':
//             return { ...state, loading: false };
//         default:
//             throw new Error();
//     }
// }

// const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
export const LoadingContext = createContext({ id: 1 });
