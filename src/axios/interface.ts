import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface RequestConfig extends Omit<AxiosRequestConfig, 'url' | 'method'> {
    url: string;
}

export interface ResponseConfig<T> {
    code: number;
    data: T;
    msg: string;
}

export interface ResponseError<T> {
    data: ResponseConfig<T>;
    response: AxiosResponse<ResponseConfig<T>>;
    message: string;
}
