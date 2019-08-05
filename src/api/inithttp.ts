import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Message } from 'element-ui'
import router from '@/router/router'


// 创建axios
const myHttp = axios.create({
    timeout: 10000
})

// 请求拦截  加上登录 token 权限
myHttp.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token;
        }
        return config;
    },
    (err: any) => {
        Promise.reject(err);
    }
);

// 响应拦截
myHttp.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (err: any) => {
        let errMsg = '';
        if (err && err.response.status) {
            switch (err.response.status) {
                case 20001:
                    errMsg = '登录状态失效，请重新登录';
                    localStorage.removeItem('user');
                    router.push('/login');
                    break;
                case 500:
                    errMsg = '服务器内部错误';
                    break;

                case 501:
                    errMsg = '服务未实现';
                    break;

                case 502:
                    errMsg = '网关错误';
                    break;

                case 503:
                    errMsg = '服务不可用';
                    break;

                case 504:
                    errMsg = '网关超时';
                    break;
                default:
                    errMsg = err.response.data.msg;
                    break;
            }
        } else {
            errMsg = err;
        }

        Message.error(errMsg);
        return Promise.reject(errMsg);
    }
);

export default myHttp;