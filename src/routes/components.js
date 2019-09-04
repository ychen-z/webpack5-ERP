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
