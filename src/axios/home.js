import { get, post, del } from './tools';

export const a = query => post({ url: '/', data: query });
export const b = query => get({ url: '/', data: query });
export const c = id => del({ url: `/c/${id}` });
