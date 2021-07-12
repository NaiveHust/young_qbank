/*
 * @Author: 肖环宇
 * @Date: 2021-07-12 15:52:54
 * @LastEditTime: 2021-07-12 16:21:07
 * @LastEditors: 肖环宇
 * @Description: 
 */
/* import { pp } from '../axios';
import rootStore from './index';
import { ElMessage } from 'element-plus' */

const exam = {

    namespaced: false,
    state: {

        //可参加的考试
        myExams:[],
        tableHead:[
            {
                prop:'eName',
                label:'考试名称',
            },
            {
                prop:'cName',
                label:'考试科目',
            },
            {
                prop:'tName',
                label:'出卷人',
            },
        ],
    },

    mutations: {
      


    },

    actions: {
       

    },
    getters: {

    }
}

export default exam