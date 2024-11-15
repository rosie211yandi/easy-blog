<template>
    <div class="all">
    <div class="container">
        <n-button @click="back">返回</n-button>
        <n-divider />
        <div class="xiugai">
            <!-- 标题 -->
            <n-h1>{{ blogInfo.title }}</n-h1>
            <n-divider />
            <!-- 文章内容 -->
            <div class="blog-content">
                <div v-html="blogInfo.content"></div>
            </div>
            <n-divider />
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const blogInfo = ref({})
const axios = inject("axios")

onMounted(() => {
    loadBlog()
})

/**
 * 读取文章详情
 */
const loadBlog = async () => {
    let res = await axios.get("/blog/detail?id=" + route.query.id)
    blogInfo.value = res.data.rows[0];
}

const back = ()=>{
    router.push("/HomePage")
}

</script>

<style>  
.all{
    
    background: url("src/assets/background.svg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -o-background-size: cover;       
     background-size: cover;
}
/* 全局样式，用于确保图片适应容器 */  
.blog-content img {  
    max-width: 50%;  
    height: auto;  
    display: inline-block; /* 防止图片下方出现额外的空间 */  
    margin: 20px 0; /* 上下添加一些间距 */  
}  
  
/* 容器样式 */  
.container {  
    opacity:0.95;
    width: 50%; /* 使用百分比宽度增加响应性 */ 
    height: 100vh; 
    max-width: 1200px; /* 限制最大宽度 */  
    margin: 0 auto;  
    padding: 20px; /* 添加内边距 */  
    box-shadow: 0 0 10px rgba(0,0,0,0.1); /* 添加一些阴影效果 */  
    background-color: #f9f9f9; /* 设定背景色 */  
    border-radius: 8px; /* 圆角边框 */  
}  
  
/* 标题样式 */  
.n-h1 {  
    color: #333; /* 标题颜色 */  
    font-size: 2.5em; /* 标题字号 */  
    margin-bottom: 20px; /* 标题与内容的间距 */  
}  
  
/* 分割线样式 */  
.n-divider {  
    margin: 20px 0; /* 上下间距 */  
    background-color: #ccc; /* 分割线颜色 */  
    height: 1px; /* 分割线高度 */  
}  
  
/* 内容样式 */  
.blog-content {  
    line-height: 1.6; /* 行高 */  
    color: #666; /* 字体颜色 */  
    font-size: 1em; /* 字体大小 */  
}  
</style>  