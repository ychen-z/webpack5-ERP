import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import E403 from '@/view/exception/403';
import E404 from '@/view/exception/404';
import E500 from '@/view/exception/500';
import App from './App';
export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" name="404" component={E404} />
            <Route path="/403" name="403" component={E403} />
            <Route path="/500" name="500" component={E500} />
            <Route component={E404} />
        </Switch>
    </Router>
);
