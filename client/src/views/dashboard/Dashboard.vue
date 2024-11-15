<template>
<div class="all">
    <div class="background-image"></div> 
    <div class="background-image2"></div> 
    <div class="pic">
        <img  
      v-for="(src, index) in svgSources"  
      :key="index"  
      :src="src"  
      style="height: 100%; display: inline-block;"  
    />       
    </div>
    <div class="top-right-fixed">  
      <!-- 这里可以放置你的按钮或其他内容 -->  
      <el-button type="primary" style="font-size: x-large;padding: 25px 20px;">后台管理系统</el-button>  
    </div>
    <n-divider />
    <div class="main-panel">
        <div class="menus">
            <div v-for="(menu, index) in menus" @click="toPage(menu)">
                {{ menu.name }}
            </div>
        </div>
        <div style="padding:20px;width:80%">
            <router-view></router-view>
        </div>    
    </div>
</div>
</template>


<script >
export default {  
  name: 'SvgImages',  
  data() {  
    return {  
      // 初始化为空数组  
      svgSources: [],  
    };  
  },  

};  
</script>
<script setup>

import { ref, reactive, inject,onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const axios = inject("axios")

const  svgSources = ref([]); // 初始化为空数组 

//菜单
let menus = [
    { name: "文章管理", href: "/dashboard/article" },
    { name: "分类管理", href: "/dashboard/category" },
    {name:"用户信息",href:"/dashboard/person"},
    { name: "退出", href: "logout" },
];

//路由跳转
const toPage = (menu) => {
    if (menu.href == 'logout') {
        router.push("/HomePage")
    } else {
        router.push(menu.href)
    }
}
//图片
  onMounted(() => {
    const svgFiles = ['test.svg', 'test1.svg', 'test2.svg', 'test3.svg', 'test4.svg','test5.svg','test6.svg','test7.svg','test8.svg','test9.svg'];  
    const baseUrl = 'src/assets/';  
    // 使用map来生成完整的文件路径数组  
   svgSources.value = svgFiles.map(file => `${baseUrl}${file}`);  
}) 
</script>

<style lang="scss" scoped>
.all{
    position: relative;
}
.background-image {  
    position: absolute;  
    bottom: 0;  
    right: 0;  
    width: 400px; /* 或你想要的宽度 */  
    height: 400px; /* 或你想要的高度，如果不设置则图片会按其原始尺寸显示 */  
    background-image: url("src/assets/back2.svg");  
    background-repeat: no-repeat;  
    z-index: 1; /* 确保这个元素位于其他内容之上 */  
}
.background-image2 {  
    position: absolute;  
    bottom: 0;  
    left:-10px;  
    width: 250px; /* 或你想要的宽度 */  
    height: 200px; /* 或你想要的高度，如果不设置则图片会按其原始尺寸显示 */  
    background-image: url("src/assets/back3.svg");  
    background-repeat: no-repeat;  
    z-index: 2; /* 确保这个元素位于其他内容之上 */  
}
.top-right-fixed {  
  position: fixed; /* 相对于浏览器窗口进行定位 */  
  top: 20px; /* 距离浏览器窗口顶部的距离 */  
  right: 0px; /* 距离浏览器窗口右侧的距离 */  
  z-index: 1000; /* 确保它位于其他元素之上 */  
  /* 可以添加其他样式，如宽度、高度、背景色等 */  
} 
.pic{
    position:relative;
     width: 100%;
    height: 100px;
    overflow:hidden;
} 

.main-panel {
    display: flex;
    color: #64676a;
    max-width: 1500px;
    margin: 0 auto;
}

.menus {
    padding: 20px 0;
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 180px;
    height: 95vh;
    border-right: 1px solid #dadada;

    div {
        cursor: pointer;

        &:hover {
            color: #fd760e;
        }
    }
}

.title {
    font-size: 65px;
    font-weight: bold;
    text-align: right;
    position: fixed;
    color: rgba(0, 0, 0, 20%);
    right: calc((100vw - 1500px) / 2);
    bottom: 20px;
}
</style>