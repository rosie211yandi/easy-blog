import { defineStore } from 'pinia'

export const AdminStore = defineStore("admin",{
    state:()=>{
        return {
            id:0,
            account:"",
            token:""
        }
    },
    actions:{
// 假设这个函数被调用时，你已经以某种方式获取了新的令牌  
    updateToken(newToken) {  
        // 直接更新 state 中的 token  
        this.token = newToken;  
        
        // 如果需要，你还可以在这里执行其他与更新令牌相关的逻辑  
        // 比如，你可能需要更新其他依赖于令牌的 state，或者执行一些副作用  
    }  
    },
    getters: {}
})