const express=require('express');
const router=express.Router();

// router.get('/:id',(req, res, next)=>{
//     console.log('idididid',req.params)
//     if(req.params.id==0){
//         next('route')
//     }else{
//         next()
//     }
// },(req, res, next)=>{
//     res.status(251);
//     res.send(req.params.id)
// })

// router.get('/:id',(req, res, next)=>{
//     res.send(`零${req.params.id}`)
// })
let { newDataBase,
    newCollection,
    deleteCollection,
    insertData,
    selectData,
    updateData,
    deleteData,
    aggregate,
    ObjectId} =require('../mongodb/base/index');
const database={
    dataBase: "mydb", collectionName: "products",
}
router.get('/',async function(req, res, next){
    var data=await selectData({
        ...database,
        data:{}
    })
    console.log('数据',data,typeof data)
    res.send(JSON.stringify(data));
})
router.post('/',(req, res, next)=>{
    console.log('ganshane11',req.body,typeof req.body);

    res.send(`零${req.params.id}`)
})
router.put('/',async function(req, res, next){
    console.log('put',req.body);
    let body=req.body;
    let {_id,cartAcount}=body;
    _id=ObjectId(_id);
    var data=await selectData({
        ...database,
        data:{_id}
        
    })
    let {acount}=data[0];
    //console.log('参数',data,acount,cartAcount)
    if(acount*1<cartAcount){
        res.send('商品不足')
    }else{
        acount=acount-cartAcount;
        //console.log(acount)
        var {msg,err,result}=await updateData({
            ...database,
            data:{
                _id
            },
            updateData:{
                $set:{
                    acount
                }
            }
        })
        if(msg=='更新成功'){
            res.send(result)
        }else{
            res.send('购买失败')
        }
        
    }
    // var data=await updateData({
    //     ...database,
    //     data:{
    //         _id:id
    //     },updateData:{
    //         $set:{

    //         }
    //     }
    // })
    
    
})
router.delete('/',(req, res, next)=>{
    res.send(`零${req.params.id}`)
})
module.exports=router;