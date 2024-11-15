<template>
    <div class="all">
    <div class="container">
        <div class="nav">
            <div @click="homePage">首页</div>
            <div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectedCategory" :options="categortyOptions" trigger="click">
                    <div>分类<span>{{ categoryName }}</span></div>
                </n-popselect>
            </div>
            <div @click="dashboard">后台</div>
            <div @click="outhere">登出</div>
        </div>
        <n-divider />
        <!--搜索-->
        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px' }" placeholder="请输入关键字" />
            <n-button type="primary" ghost @click="loadBlogs(0)"> 搜索 </n-button>
        </n-space>
         <!--展示-->
        <div v-for="(blog, index) in blogListInfo" style="margin-bottom:15px;cursor: pointer;">
            <n-card :title="blog.title" @click="toDetail(blog)">
                {{ blog.content }}

                <template #footer>
                    <n-space align="center">
                        <div>发布时间：{{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>

        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

        <n-divider />
        <div class="footer">
            <div>Power by yanyan</div>
            <div>2714790749@qq.com</div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 路由
const router = useRouter()
const route = useRoute()

const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")

// 选中的分类
const selectedCategory = ref(0)
// 分类选项
const categortyOptions = ref([])
// 文章列表
const blogListInfo = ref([])

// 查询和分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId:0,
})

onMounted(() => {
    loadCategorys();
    loadBlogs()
})

/**
 * 获取博客列表
 */
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page;
    }
    // let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
    let res = await axios.post(`/blog/search`,{keyword:pageInfo.keyword,page:pageInfo.page,pageSize:pageInfo.pageSize,categoryId:pageInfo.categoryId})
    let temp_rows = res.data.data.rows;
    // 处理获取的文章列表数据
    for (let row of temp_rows) {
        row.content += "..."
        // 把时间戳转换为年月日
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    blogListInfo.value = temp_rows;
    pageInfo.count = res.data.data.count;
    //计算分页大小
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
    console.log(res)
}

const categoryName = computed(() => {
    //获取选中的分类
    let selectedOption = categortyOptions.value.find((option) => { return option.value == selectedCategory.value })
    //返回分类的名称
    return selectedOption ? selectedOption.label : ""
})

/**
 * 获取分类列表
 */
const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categortyOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    console.log(categortyOptions.value)
}

/**
 * 选中分类
 */
const searchByCategory = (categoryId)=>{
    pageInfo.categoryId = categoryId ;
    loadBlogs()
}

//页面跳转
const toDetail = (blog)=>{
    router.push({path:"/detail",query:{id:blog.id}})
}

const homePage = () => {
    router.push("/HomePage")
}

const dashboard = () => {
    router.push("/dashboard")
}

const outhere=()=>{
    router.push("/")
}

</script>

<style lang="scss" scoped>
.all{
 
    background: url("src/assets/background.svg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -o-background-size: cover;       
     background-size: cover;
}
.search{
    margin-bottom: 15px;
}
.container {
    opacity:0.95;
    padding:8px 50px ;
    background-color: #ffffff;
    width: 1200px;
    margin: 0 auto;
}

// .nav {
//     display: flex;
//     font-size: 20px;
//     padding-top: 20px;
//     color: #64676a;

//     div {
//         cursor: pointer;
//         margin-right: 15px;

//         &:hover {
//             color: #f60;
//         }

//         span {
//             font-size: 12px;
//         }
//     }
// }
.nav {  
    display: flex;  
    align-items: center; /* 垂直居中子元素 */  
    font-size: 18px; /* 稍微减小字体大小，使整体看起来更协调 */  
    padding: 5px 0; /* 上下内边距调整为一致，并适当减小 */  
    background-color: #ffffff; /* 添加浅灰色背景，增加层次感 */  
    border-bottom: 1px solid #ccc; /* 添加底部边框，增强视觉分隔 */  
  
    div {  
        cursor: pointer;  
        margin-right: 20px; /* 增加间隔，使导航项之间更加分散 */  
        padding: 5px 10px; /* 为导航项添加一些内边距，使其看起来不那么拥挤 */  
        border-radius: 5px; /* 添加圆角，使导航项看起来更柔和 */  
        transition: background-color 0.3s, color 0.3s; /* 添加过渡效果，使颜色变化更平滑 */  
  
        &:hover {  
            background-color: #e9ecef; /* 悬停时改变背景色 */  
            color: #f60; /* 悬停时改变文字颜色 */  
        }  
  
        span {  
            font-size: 14px; /* 稍微增大span的字体大小，使其与主文字大小相协调 */  
            color: #92bfea; /* 为span设置默认颜色，使其不那么显眼 */  
  
            /* 如果需要，可以为span添加悬停时的颜色变化 */  
            /* &:hover {  
                color: #f60;  
            } */  
            /* 但注意，这里的&:hover可能不起作用，因为span通常不会单独触发hover事件，  
            除非它被包裹在一个可悬停的容器内（如a标签或div，但在这里div已经包含了hover效果）。  
            如果你想要span在div悬停时也改变颜色，可以省略这个hover选择器。 */  
        }  
    }  
}
.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>