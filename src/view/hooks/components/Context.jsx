import React, { createContext, useContext } from 'react';

const MyContext = createContext({ text: '这是默认值' });
const Context = () => {
    const value = useContext(MyContext);
    console.log(value);
    return (
        <MyContext.Provider value={{ text: '我是父组件传下来的值' }}>
            <Step1 />
        </MyContext.Provider>
    );
};

const Step1 = () => {
    return (
        <>
            step2: <Step2 />
            <br />
            step3: <Step3 />
        </>
    );
};

const Step2 = () => {
    return <MyContext.Consumer>{value => value.text}</MyContext.Consumer>;
};

const Step3 = () => {
    const { text } = useContext(MyContext);
    return text;
};

export default Context;
