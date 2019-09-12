import React, { Component } from 'react';

class DerivedStateFromProps extends Component {
    state = {
        a: ''
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.a !== prevState.a) {
            return {
                a: nextProps.a
            };
        }
        return null;
    }

    componentDidUpdate(nextProps, prevState, snapshot) {
        console.log('this.componentDidUpdate');
        if (snapshot) {
            console.log('snapshot:' + snapshot);
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('this.getSnapshotBeforeUpdate');
        return true;
    }

    render() {
        console.log('更新');
        return <div>getDerivedStateFromProps</div>;
    }
}

export default class Index extends Component {
    state = {
        a: 1
    };
    DerivedStateFromProps = () => {
        this.setState({
            a: 2
        });
    };
    render() {
        return (
            <div>
                <DerivedStateFromProps {...this.state} />
                <button onClick={this.DerivedStateFromProps}>更新 DerivedStateFromProps</button>
            </div>
        );
    }
}
