import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import All from './components'; // 所有组件
import { routes } from './route';

export default class CRouter extends Component {
    requireAuth = Com => {
        return <Com />;
    };
    render() {
        return (
            <Switch>
                {routes.map(r => {
                    const route = r => {
                        const Component = All[r.component];
                        return (
                            <Route
                                key={r.link || r.key}
                                exact
                                path={r.link || r.key}
                                render={() => this.requireAuth(Component)}
                                // render={() => (r.noNeedAuth ? this.noNeedAuth(Component) : this.requireAuth(Component, r.link, r.parentLink))}
                            />
                        );
                    };
                    return r.component ? route(r) : r.sub.map(r => route(r));
                })}
            </Switch>
        );
    }
}
