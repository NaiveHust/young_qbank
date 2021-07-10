/*
 * @Author: 肖环宇
 * @Date: 2021-07-06 09:58:34
 * @LastEditTime: 2021-07-10 19:08:53
 * @LastEditors: 肖环宇
 * @Description: 
 */
import axios from "axios";


const config = {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:9000/api/v1' : 'http://localhost:9000/api/v1',
    timeout: 5000
}

const paperConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:7000/api/v1' : 'http://localhost:7000/api/v1',
    timeout: 5000
}

const qsConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:8000/api/v1' : 'http://localhost:8000/api/v1',
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