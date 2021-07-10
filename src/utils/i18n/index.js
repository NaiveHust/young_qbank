/*
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-06 19:42:32
 * @LastEditors: 肖环宇
 * @Description: 
 */

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'cn',		//默认显示的语言
    messages: {
        cn: require('./cn.js'),	//引入语言文件
        en: require('./en.js')
        //         cn: {
        //             login: {
        //                 username: '用户名',
        //                 pwd: '密码',
        //                 login: '登录',
        //                 tip: '通过切换语言按钮，来改变当前内容的语言。',
        //                 lang: '中文'
        //             }
        // }
    }
});
// import('./en.js').then((res) => {

//     console.log(res.default);
// });
console.log(i18n.global.messages);
// console.log(require('./cn.js'));

export default i18n;

