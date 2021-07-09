/*
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-09 10:39:29
 * @LastEditors: 肖环宇
 * @Description: 
 */

import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
import './assets/css/main.css'
import './assets/css/color-dark.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import i18n from './utils/i18n/index'
import App from './App.vue'
import router from './router';
import store from './store'
import * as echarts from 'echarts'



const app = createApp(App);
app.use(ElementPlus, { locale })
    .use(router)
    .use(store)
    .use(i18n)
    ;
app.config.globalProperties.$echarts = echarts
app.mount('#app');

console.log('development:', process.env.NODE_ENV === 'development');
console.log('production:', process.env.NODE_ENV === 'production');
console.log('baseURL', process.env.BASE_URL);