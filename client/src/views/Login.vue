<template>
  <div class="all">
    <div class="background-image"></div> 
    <div class="background-image2"></div> 
    <div class="background-image3"></div> 
    <div class="background-image4"></div> 
    <div class="login-panel">
        <n-card title="管理后台登录">
            <n-form :rules="rules" :model="admin">
                <n-form-item path="account" label="账号">
                    <n-input v-model:value="admin.account" placeholder="请输入账号" />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-checkbox v-model:checked="admin.rember" label="记住我" />
                <n-button @click="login">登录</n-button>
            </template>
        </n-card> 
        <div class="photo">
          <n-carousel
            direction="vertical"
            dot-placement="right"
            mousewheel
            style="width: 100%; height: 100%"
           >
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            >
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            >
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            >
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            >
          </n-carousel>
        </div>
     </div>
    </div>
</template>

<script setup>
//引入vue3方法
import { ref, reactive, inject } from 'vue'
import { AdminStore } from '../store/AdminStore'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
//注入全局API
const message = inject("message")
const axios = inject("axios")
const adminStore = AdminStore()

/**验证表单规则 */
let rules = {
  account: [
      { required: true, message: "请输入账号", trigger: "blur" },
      { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
  ],
  password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
  ],
};

/**管理员登录数据 */
const admin = reactive({
  account: localStorage.getItem("account") || "",
  password: localStorage.getItem("password") || "",
  rember: localStorage.getItem("rember") == 1 || false
})

/**登录 */
const login = async () => {
  let result = await axios.post("/admin/login", {
      account: admin.account,
      password: admin.password
  });
  if (result.data.code == 200) {
      adminStore.updateToken( result.data.data.token)
      adminStore.account = result.data.data.account
      adminStore.id = result.data.data.id

      //把数据存储到localStorage
      if (admin.rember) {
          localStorage.setItem("account", admin.account)
          localStorage.setItem("password", admin.password)
          localStorage.setItem("rember", admin.rember ? 1 : 0)
      }
      router.push("/HomePage")
      message.info("登录成功")
  } else {
      message.error("登录失败")
  }

}

</script>

<style lang="scss" scoped>

.all{
  position: relative;
  margin:0;
}
.background-image {  
    position: absolute;  
    top: 10px;  
    left: 500px;  
    width: 300px; /* 或你想要的宽度 */  
    height: 300px; /* 或你想要的高度，如果不设置则图片会按其原始尺寸显示 */  
    background-image: url("src/assets/login/posit2.svg");  
    background-repeat: no-repeat;  
    z-index: 1; /* 确保这个元素位于其他内容之上 */  
}
.background-image2 {  
    position: absolute;  
    bottom:150px;  
    left:603px;  
    width: 400px; /* 或你想要的宽度 */  
    height: 150px; /* 或你想要的高度，如果不设置则图片会按其原始尺寸显示 */  
    background-image: url("src/assets/login/posit1.svg");  
    background-repeat: no-repeat;  
    z-index: 2; /* 确保这个元素位于其他内容之上 */  
}
.background-image3 {  
    position: absolute;  
    top: 0;  
    right:-10px;  
    width: 350px; /* 或你想要的宽度 */  
    height: 300px; /* 或你想要的高度，如果不设置则图片会按其原始尺寸显示 */  
    background-image: url("src/assets/login/posit3.svg");  
    background-repeat: no-repeat;  
    z-index: 2; /* 确保这个元素位于其他内容之上 */  
}
.background-image4 {  
    position: absolute;  
    bottom: 0;  
    left:0px;  
    width: 300px; /* 或你想要的宽度 */  
    height: 300px; /* 或你想要的高度，如果不设置则图片会按其原始尺寸显示 */  
    background-image: url("src/assets/login/posit4.svg");  
    background-repeat: no-repeat;  
    z-index: 2; /* 确保这个元素位于其他内容之上 */  
}
.photo{
  border-radius:0 10px 10px 0px; /* 圆角 */  
  display: flex;  
  width: 400px;
  height: 390px;
  background-color: #126dec;
  margin-left: 0px;
}
.carousel-img {
  border-radius:0 10px 10px 0px; /* 圆角 */  
  width: 100%;
  height:100%;
  object-fit: cover;
}
.login-panel {  
  margin-right: 0px;
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 100vh; /* 使登录面板垂直居中 */  
  background-color: #818d9f; /* 浅灰色背景 */  
  background-image: linear-gradient(to right, #f0f2f5, #e3e9f3); /* 轻微渐变背景 */  
  padding: 20px;  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */  
}  
  
.n-card {  
  border-radius: 10px 0 0 10px; /* 圆角 */  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* 更深的阴影 */  
  overflow: hidden; /* 防止内部内容溢出 */  
  background-color: #ffffff; /* 白色背景 */  
  width: 400px; /* 固定宽度 */  
  padding: 20px; /* 内部填充 */  
}  
  
.n-card-title {  
  font-size: 18px; /* 标题字体大小 */  
  font-weight: bold; /* 标题加粗 */  
  color: #ffffff; /* 标题颜色 */  
}  
  
.n-form-item {  
  margin-bottom: 6px; /* 表单项之间的间距 */  
}  

.n-input {  
  border-radius: 10px; /* 输入框圆角 */  
  border: 1px solid #ccc; /* 输入框边框 */  
  padding: 6px; /* 输入框内填充 */  
  font-size: 18px; /* 输入框字体大小 */  
}  
  
.n-checkbox {  
  margin-right: 10px; /* 复选框与文本之间的间距 */  
}  
  
.n-button {  
  border-radius: 5px; /* 按钮圆角 */  
  background-color:  #2a85e0; /* 按钮背景色（Element Plus蓝色）*/  
  color: #fdfdfd; /* 按钮文字颜色 */  
  border: none; /* 去除边框 */  
  padding: 10px 25px; /* 按钮内填充 */  
  font-size: 16px; /* 按钮字体大小 */  
  cursor: pointer; /* 鼠标悬停时显示手指形状 */  
  transition: background-color 0.3s; /* 背景色过渡效果 */  
}  
  
.n-button:hover {  
  background-color: #1655d3; /* 鼠标悬停时按钮背景色加深 */  
  color: #bdbfc7; /* 按钮文字颜色 */  
}  
</style>