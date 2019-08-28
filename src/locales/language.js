import { useState } from 'react';
import zh_CN from './zh-CN';
import en_US from './en-US';

export function useLanguage(lang) {
    let [language] = useState('zh');
    let locale;
    let messages;

    if (language === 'zh') {
        locale = 'zh';
        messages = zh_CN;
    } else if (language === 'en') {
        locale = 'en';
        messages = en_US;
    }

    return [locale, messages];
}
