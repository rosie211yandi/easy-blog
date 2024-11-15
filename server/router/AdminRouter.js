const express = require('express')
const router = express.Router()
const {v4:uuidv4} = require('uuid')
const { db,genid } = require("../db/config")

//登录接口 验证通过
router.post("/login",async(req,res)=>{
    let { account,password } = req.body
    console.log(req.body)
    let { err,rows } = await db.async.all("select * from admin where account = ? AND password = ?",[account,password])
    if(err === null && rows.length>0){
        let login_token = uuidv4()
        let update_token_sql = "UPDATE `admin` SET `token` = ? WHERE `id` = ?" 
        await db.async.all(update_token_sql,[login_token,rows[0].id])
        let admin_info = rows[0]
        admin_info.token = login_token
        res.send({
            code:200,
            msg:'登录成功',
            data:admin_info
        })
    }else{
        res.send({
            code:500,
            msg:'登录失败'
        })
    }
})

//查询，修改接口，添加
// router.post("/add",async(req,res)=>{
//     let{name}=req.body
//     const insert_sql="INSERT INTO `admin`(`id`,`account`,`mailbox`,`introduce`,`createtime`) VALUES(?,?,?,?,?)"
//     await ab.async.run(insert_sql,[genid.NextId(),name])
// })
router.get("/select", async (req, res) => {  
    console.log(req.query);
    let { account } = req.query
    let admin_token_sql = "SELECT * FROM `admin` WHERE `account` = ? "
    let { err,rows } = await db.async.all(admin_token_sql, [account]) ;
    
    if (err==null||rows.length!=0) {
        res.send({
            code: 200,
            msg: "获取成功",
            rows
        })
    } else {
        res.send({
            code: 500,
            msg: "获取失败"
        })
    }
});

module.exports = router