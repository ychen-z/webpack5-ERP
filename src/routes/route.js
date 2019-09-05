import { Home, Intl, Hooks } from './components';

export const routes = [
    { link: '/app/index', title: '首页', component: Home },
    { link: '/app/intl', title: '国际化', component: Intl },
    { link: '/app/hooks', title: 'hooks', component: Hooks }
];
