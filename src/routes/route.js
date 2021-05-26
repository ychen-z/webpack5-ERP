import { Home, Intl, Hooks, Demo } from './components';

export const routes = [
    { link: '/app/index', title: '首页', component: Home },
    { link: '/app/intl', title: '国际化', component: Intl },
    { link: '/app/hooks', title: 'hooks', component: Hooks },
    { link: '/app/demo', title: 'demo', component: Demo }
    // { link: '/app/auth/user', title: 'demo', component: User },
    // { link: '/app/auth/menu', title: 'demo', component: MenuPage },
    // { link: '/app/auth/role', title: 'demo', component: RolePage }
];
