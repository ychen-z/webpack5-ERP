import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
class Home extends Component {
    render() {
        let { intl } = this.props;
        return (
            <div className="m-home">
                首页
                <div>{intl.messages['page.localeProvider.react']}</div>
                <div>{intl.formatMessage({ id: 'page.localeProvider.react' }, { name: '2' })}</div>
            </div>
        );
    }
}

export default injectIntl(Home);
