import Loadable from 'react-loadable';
import MyLoadingComponent from '@/components/loading/Loading';

const load = (name, loader) =>
    Loadable({
        name: name,
        loader: loader,
        loading: MyLoadingComponent
    });

const Home = load('首页', () => import('@/view/home/Index'));
const Intl = load('首页', () => import('@/view/intl/Index'));

export default {
    Home,
    Intl
};
