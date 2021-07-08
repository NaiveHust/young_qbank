/*
 * @Author: 肖环宇
 * @Date: 2021-07-06 09:58:34
 * @LastEditTime: 2021-07-07 23:34:14
 * @LastEditors: 肖环宇
 * @Description: 
 */
import axios from "axios";
import store from '../store'

const config = {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://some-domain.com/api' : 'http://localhost:9000/api/v1',
    timeout: 5000
}

const paperConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://some-domain.com/api' : 'http://localhost:7000/api/v1',
    timeout: 5000
}

const qsConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://some-domain.com/api' : 'http://localhost:8000/api/v1',
    timeout: 5000
}
const instance = axios.create(config);
const pp = axios.create(paperConfig);
const qs = axios.create(qsConfig);


instance.interceptors.request.use(config => {

    console.log(store.state.userInfo);
    console.log('config', config);
    return config;
})

export { instance, pp, qs };