/*
 * @Author: 肖环宇
 * @Date: 2021-07-06 10:24:41
 * @LastEditTime: 2021-07-11 20:47:06
 * @LastEditors: 肖环宇
 * @Description: 
 */
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/qb/'
        : '/',
        chainWebpack: (config) => {
            config
                .plugin('html')
                .tap((args) => {
                    args[0].title = 'NaiveYoung';
                    return args;
                });
        }
}