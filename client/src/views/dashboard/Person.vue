<template> 
  <div class="all">  
    <div class="card-container">  
      <el-card class="box-card">  
        <div slot="header" class="clearfix" style="text-align: center;">  
          <span style="font-size: x-large;">个人信息</span>  
        </div>  
        <div class="text item">  
          <p><span>ID：</span>{{ adminInfo.id }}</p> <!-- 注意这里我假设ID应该使用userInfo.id而不是userInfo.name -->  
          <p><span>账户：</span>{{adminInfo.account }}</p>  
          <p><span>邮箱：</span>{{ adminInfo.mailbox }}</p>  
          <p><span>创立时间：</span>{{ adminInfo.createtime }}</p> <!-- 这里将'创建时间'改为'职业'以匹配数据 -->  
        </div>  
 
      </el-card>  
      <el-card class="speak">  
        <!-- 这里可以添加speak卡片的内容 -->  
        <div slot="header" class="clearfix" style="text-align: center;">  
          <span style="font-size: x-large;">作者有话说</span>  
        </div>  
        <div class="introduce">  
          <p style="font-size:large ;">{{ adminInfo.introduce }}</p> <!-- 假设添加了一个新的userInfo.bio属性 -->  
        </div> 
      </el-card>  
    </div>  
  </div>  
</template>  
  
<script setup>  
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const axios = inject("axios")
const adminInfo = ref({})
onMounted(() => {
  console.log(localStorage.getItem("account"));
    loaduser()
})  


const loaduser = async () => {

  let res = await axios.get("/admin/select?account=" + localStorage.getItem("account"))
  let d = new Date(res.data.rows[0].createtime)
  res.data.rows[0].createtime = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  adminInfo.value = res.data.rows[0];
}
</script>  
  
<style scoped>  
.all {  
  position: relative;  
  margin: 0;  
}  
.card-container {  
  display: flex; /* 设置为Flex布局 */  
  justify-content: space-between; /* 卡片之间留有空隙 */  
}  
.box-card,  
.speak {  
  flex: 80%; /* 使卡片填充可用空间 */  
  margin: 10px; /* 可选：为卡片添加外边距 */  
  padding: 20px; /* 可选：为卡片内容添加内边距 */  
}  
.speak {  
  background-color: #126dec;  
  color: white; /* 如果背景色较深，可能需要设置文字颜色为白色 */  
  border-radius: 10px; /* 可选：为speak卡片添加圆角 */  
}  
.text p {  
  font-size: large;  
  line-height: 1.5; /* 更自然的行高 */  
}  
.text span,  
.introduce span {  
  font-weight: bold; /* 可选：使标签文字加粗 */  
  color: #333; /* 可选：设置标签文字颜色 */  
}  
.introduce {  
  margin-top: 10px; /* 可选：与上方内容分隔 */  
}  
</style>