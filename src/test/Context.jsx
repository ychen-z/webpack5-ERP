import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext('Light');

export default class Context extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount() {
        this.myRef.current.focus();
    }

    focus = () => {
        this.myRef.current.focus();
    };

    render() {
        return (
            <Provider value="dark">
                {/* <input ref={this.myRef} /> */}
                <Step1 />
            </Provider>
        );
    }
}
// 嵌套1
class Step1 extends React.Component {
    render() {
        return (
            <div>
                <Step2 />
            </div>
        );
    }
}

// 嵌套2
class Step2 extends React.Component {
    render() {
        return <Consumer>{theme => <div>Now, the theme is {theme}</div>}</Consumer>;
    }
}
