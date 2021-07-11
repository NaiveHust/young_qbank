/*
 * @Author: 肖环宇
 * @Date: 2021-07-06 09:58:34
 * @LastEditTime: 2021-07-11 14:11:31
 * @LastEditors: 肖环宇
 * @Description: 
 */
import axios from "axios";


const config = {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://123.57.215.118:9000/api/v1' : 'http://123.57.215.118:9000/api/v1',
    timeout: 5000
}

const paperConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://101.201.151.170:7000/api/v1' : 'http://101.201.151.170:7000/api/v1',
    timeout: 5000
}

const qsConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://101.201.151.170:8000/api/v1' : 'http://101.201.151.170:8000/api/v1',
    timeout: 5000
}
const instance = axios.create(config);
const pp = axios.create(paperConfig);
const qs = axios.create(qsConfig);


instance.interceptors.request.use(config => {

   //console.log(store.state.userInfo);
   //console.log('config', config);
    return config;
})

export { instance, pp, qs };