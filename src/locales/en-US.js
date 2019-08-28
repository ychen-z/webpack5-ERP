// en_US.js
// import appLocaleData from 'react-intl/locale-data/en';
import enLocal from './en';
import enUS from 'antd/lib/locale-provider/en_US';

const en_US = {
    // data: appLocaleData, // react-intl 语言包
    locale: enLocal, // 自定义的语言包
    localeName: 'en', // 配置命名
    antd: enUS // antd 语言包
};

export default en_US;
