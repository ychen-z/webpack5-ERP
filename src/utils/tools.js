// 获取url中的参数
export const getUrlParams = (url = location.href) => {
    var reg = /(\w+)=([^&]+)/g,
        params = {},
        result = [];

    url = url.split('?')[1] || '';

    while ((result = reg.exec(url))) {
        params[result[1]] = result[2];
    }
    return params;
};

/**
 * 深拷贝
 */
export const deepClone = source => {
    if (!source || typeof source !== 'object') {
        return source;
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
};

// 是否是手机号码
export const isMobile = str => /^(1)\d{10}$/.test(str);

// 是否是身份证
export const isIdCard = str => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);

// 是否是邮箱
export const isEmail = (str = '') => str.includes('@');

// 去除前后空格
export const empty = (str = '') => str.replace(/^\s+|\s+$/g, '');

// 去除所有空格
export const emptyAll = (str = '') => str.replace(/\s/g, '');

// 是否包含英文
export const includeEn = str => str.search(/[a-zA-Z]+/) > -1;

// 是否为对象
export const isObject = str => Object.prototype.toString.call(str) === '[object Object]';

// 是否为数字
export const isNumber = str => Object.prototype.toString.call(str) === '[object Number]';

// 是否为Promise函数
export const isPromise = str => Object.prototype.toString.call(str) === '[object Promise]';

// 格式化时间格式(type：时间类型 hour | minute)
export const formatTime = (time, type = 'hour') => {
    let h, m;
    if (type === 'hour') {
        h = Math.floor(time); // 时
        m = (time * 60) % 60; // 分
    }

    if (type === 'minute') {
        h = Math.floor(time / 60); // 时
        m = time % 60; // 分
    }

    if (h && m) return `${h}h ${m}min`;
    if (h && !m) return `${h}h`;
    if (!h && m) return `${m}min`;
    return;
};

export const sortData = data => {
    const d = deepClone(data);
    // 按照sort排序
    d.sort((a, b) => {
        return a.sort - b.sort;
    });
    return d;
};

export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
