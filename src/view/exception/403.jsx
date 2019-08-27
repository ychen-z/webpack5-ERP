import React, { Component } from 'react';

const MyContext = React.createContext();

export default class P403 extends Component {
    static contextType = MyContext;

    componentDidMount() {
        console.log(this.contextType);
    }

    render() {
        return <div>403</div>;
    }
}
