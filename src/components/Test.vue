<!--
 * @Author: 肖环宇
 * @Date: 2021-06-29 12:35:17
 * @LastEditTime: 2021-07-12 23:02:11
 * @LastEditors: 肖环宇
 * @Description: 
-->

<template>
  <div class="paper">
    <!-- 试卷主题信息 -->
    <el-row class="paper-main-info" >
      
          <el-form
            :model="paperContent.Info"
            ref="form"
            :inline="true"
            size="small"
            class = 'info-form'
          >
            <el-form-item :label="$t('paper.paperName')">
              <span>{{paperContent.Info.name}}</span>
              
            </el-form-item>

            <el-form-item :label="$t('paper.paperScore')">
              <span>{{paperContent.Info.score}}</span>
            </el-form-item>

            <el-form-item :label="$t('paper.paperDuration')">
              <!-- <el-input
                v-model.number="paperContent.Info.duration"
                type="number"
                style="width: 10vw"
                ><template #append> 分钟 </template></el-input
              > -->
              <span>{{paperContent.Info.duration}}分钟</span>
            </el-form-item>

            <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
          </el-form>
        
    </el-row>
    <el-row class="paper-main">
      <!-- 导航目录 -->
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <div class="paper-outline-view">
          <el-scrollbar style="height: 75vh">
            <transition-group>
              <ul
                class="type"
                v-for="(type,index) in typeList"
                :key="index"
                style="width: 90%; display: flex; flex-direction: column"
                draggable="true"
                @dragstart="handleDragStart($event, type)"
                @dragover.prevent="handleDragOver($event, type)"
                @dragenter="handleDragEnter($event, type)"
                @dragend="handleDragEnd($event, type)"
              >
                <div>
                  <span>{{ type.label }}</span>
                  <span style="margin-left: 20px">共{{ type.num }}题</span>
                  <el-button
                    size="small"
                    :class="
                      type.fold ? 'el-icon-caret-right' : 'el-icon-caret-bottom'
                    "
                    style="float: right"
                    @click="type.fold = !type.fold"
                  ></el-button>
                </div>

                <li
                  v-for="(topic, index) in paperContent[type.name].topic"
                  v-show="!type.fold"
                  :key="index"
                  :style="topic.finish?'background:#67C23A':''"
                  class="topic"
                  @click="editTopic(type.name, topic.order)"
                >
                  第{{ topic.order }}题

                  
                </li>
              </ul>
            </transition-group>
          </el-scrollbar>
        </div>
      </el-col>
      <!-- 显示单个题目 -->
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
        
       
        <!-- 显示单个题目 -->
        <div class="paper-edit">
          <component :is="editCom" class="topic-com"></component>
        </div>
      </el-col>

      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5"> </el-col>
    </el-row>
  </div>
</template>

<script>
import  Single from "./reply/Rsingle";
import Multiple from "./reply/Rmultiple";
import Answer from "./reply/Ranswer";
import Fill from "./reply/Rfill";
import Truefalse from "./reply/Rtruefalse";

export default {
  data() {
    return {
      form: {
        paperName: "",
        paperScore: "",
        paperDuration: "",
      },
      dragging: null,
      div: null,
      dialogVisible: false,
      editCom: "",
    };
  },
  components: {
    Single,
    Multiple,
    Answer,
    Fill,
    Truefalse,
  },
  //会有缓存，只有依赖的响应式属性发生变化时，才会重新计算。
  computed: {
    paperContent() {
      return this.$store.state.paper.paperContent;
    },
    typeList() {
      return this.$store.state.paper.typeList;
    },
  },
  created() {
    let paperContent = JSON.parse(localStorage.getItem("the-test"));

    console.log(JSON.parse(localStorage.getItem("young-userInfo")));
    this.$store.commit("setpaperContent", paperContent);
    this.$store.commit("setTypeList");
    console.log("新的vuex实例", this.$store);
  },
  methods: {
    handleDragStart(e, item) {
      this.dragging = item;
      e.dataTransfer.setDragImage(this.div, 0, 0);
    },
    handleDragEnd() {
      this.dragging = null;
      // console.log(e);
      //console.log(item);
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move";

      // e.dataTransfer.dropEffect="move";
      // console.log(e.target);
      //在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }
      //交换元素在数组中的顺序

      // const src = this.paperContent.indexOf(this.dragging);
      // const dst = this.paperContent.indexOf(item);
      var temp = this.dragging.order;
      this.dragging.order = item.order;
      item.order = temp;
    },
    handleClose() {
      console.log("关闭了");
    },
    addType(type) {
      this.$store.commit("addType", type);
    },
    deleteType(type) {
      this.$store.commit("deleteType", type);
    },

    chooseType(name, index) {
      this.addType({
        index: index,
        name: name,
        label: this.$i18n.messages["cn"].topic[name],
        order: index,
        //题型是否折叠
        fold: false,
        num: 0,
        //此为全局默认分数，可被全局覆盖
        score: 5,
      });
    },

    saveType() {
      this.$store.commit("saveType");
      this.dialogVisible = false;
    },
    editTopic(name, order) {
      this.editCom = name;
      this.$store.commit("setOrder", order);
      console.log(name);
    },
    importTopic() {
      this.$refs.import.dialogVisible = true;
    },
    deleteTopic(typeName, order) {
      this.$store.commit("deleteTopic", { typeName, order });
    },

    finishPaper() {
      this.$store.dispatch("finishPaper");
    },
    customColorMethod(percentage) {
      console.log(percentage);
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else if (this.nowScore > this.paperInfo.score) {
        return "#F56C6C";
      } else {
        return "#67c23a";
      }
    },
  },
  beforeUnmount() {
    localStorage.removeItem("the-test");
  },
};
</script>

<style scoped>
.paper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.paper-main {

  width: 100%;
  height: 80%;
  border: 1vh solid rgb(41, 86, 207, 0.3);
}
.paper-main-info {
  width: 100%;
  height: 10%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  border: 1vh solid rgb(41, 86, 207, 0.3);
}

.info-form .el-form-item{
width: 10vw;
margin:0 5vw ;
}
.paper-bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.paper-progress {
  width: 100%;
  height: 100%;
}

.paper-bar button {
  height: 80%;
  width: auto;
}
.paper-outline-view {
  width: 80%;
  height: 90%;

  background: rgb(31, 138, 180, 0.1);
  margin: 2% 0;
}
.paper-edit {
  width: 100%;
  height: 100%;
}

.topic-com {
  width: 95%;
  height: 95%;
  margin: 1%;
  border: 1vh solid rgb(41, 86, 207, 0.3);
}
.el-form-item {
  width: 20%;
}
.type {
  margin: 2vh 0;
  transition: all linear 0.3s;
  border: 1vh solid rgb(166, 186, 224);
}
.topic {
  margin: 1vh 0;
  height: 5vh;
  border: 1vh solid #fff;
  
}
.type-view {
  height: 90%;
  width: 90%;
  margin: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px ridge rgb(62, 130, 185, 0.5);
  border-radius: 1rem;
}

.dialog-form {
  height: 100%;
  width: 100%;
  border: 3px solid rgb(62, 130, 185, 0.5);
  border-radius: 1rem;
}
.dialog-footer {
  height: 10%;
}
.dialog-right {
  height: 50vh;
  width: 90%;
  margin: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px ridge rgb(62, 130, 185, 0.5);
  border-radius: 1rem;
}
.dialog-right .el-button {
  width: 60%;
  width: 80%;
  margin: 2% 0;

  color: rgb(36, 3, 51);
  background: rgba(21, 103, 197, 0.2);
}
.dialog-left-one {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}

.type-view .el-form-item {
  display: flex;
  width: 100%;
  color: rgba(160, 33, 219, 1);
  background: rgba(27, 28, 109, 0.1);
}
.progress-val {
  font-size: 16px;
}
</style>