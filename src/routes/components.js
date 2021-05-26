import Loadable from 'react-loadable';
import MyLoadingComponent from '@/components/loading/Loading';

const load = (name, loader) =>
    Loadable({
        name: name,
        loader: loader,
        loading: MyLoadingComponent
    });

export const Home = load('首页', () => import('@/view/home/Index'));
export const Intl = load('国际化', () => import('@/view/intl/Index'));
export const Hooks = load('hooks', () => import('@/view/hooks/Index'));
export const Demo = load('demo', () => import('@/view/page'));
// export const User = load('demo', () => import('@/view/auth/user'));
// export const RolePage = load('demo', () => import('@/view/auth/role'));
// export const MenuPage = load('demo', () => import('@/view/auth/menu'));
