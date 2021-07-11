/*
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-10 18:32:20
 * @LastEditors: 肖环宇
 * @Description: 
 */

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'cn',		//默认显示的语言
    messages: {
        cn: require('./cn.js'),	//引入语言文件
        en: require('./en.js')
 
    }
});


export default i18n;

