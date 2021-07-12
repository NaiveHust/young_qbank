/*
 * @Author: 肖环宇
 * @Date: 2021-07-12 15:52:54
 * @LastEditTime: 2021-07-12 20:00:48
 * @LastEditors: 肖环宇
 * @Description: 
 */
 import { pp } from '../axios';
import rootStore from './index';
//import { ElMessage } from 'element-plus' 

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
        //考哪张试卷
        examOrder:0,
    },

    mutations: {
        setExOrder(state,order){
            state.examOrder = order;
        }


    },

    actions: {
      async getExams({state,dispatch}){
          await dispatch('getChosen');
          let courses =rootStore.state.cs.myCourses;
          state.myExams = [];
            for (const cs of courses) {
                await pp.get(`paper/findByClaAndTea/${cs.cName}/${cs.tid}/1/10000`).then(res=>{
                   for (const ex of res.data.list) {
                       if(ex.paperType ==='yes'){
                           state.myExams.push(
                               {
                                   eName:ex.paperName,
                                   cName:cs.cName,
                                   tName:cs.tName,
                                   paper:ex,
                               }
                               );
                               rootStore.state.myExams=[];
                               rootStore.state.myExams.push( {
                                eName:ex.paperName,
                                cName:cs.cName,
                                tName:cs.tName,
                                paper:ex,
                            });
                            console.log(rootStore.state.myExams);
                       }
                   }
                    
                })
            }
            console.log('测试',state.myExams);
            
       }

    },
    getters: {

    }
}

export default exam