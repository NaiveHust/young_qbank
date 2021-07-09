/*
 * @Author: 肖环宇
 * @Date: 2021-07-09 10:56:25
 * @LastEditTime: 2021-07-09 11:32:16
 * @LastEditors: 肖环宇
 * @Description: 
 */
/* import { instance,pp,qs } from '../axios';
import rootStore from './index';
import { ElMessage } from 'element-plus' */

const admin = {
    namespaced: false,
    state: {

        userType:[
            {label:'学生',value:1},
            {label:'老师',value:2},
            {label:'课程',value:3},
            {label:'试题',value:4},
            {label:'试卷',value:5},
        ],
        //学生
        stuList:[],
       // 课程
        courseList:[],
       // 题目
        qsList:[],
      //  老师
        teaList:[],
       // 试卷
        ppList:[],

    },

    mutations: {
      

    },

    actions: {
     
        
    },
    getters: {}
}

export default admin;