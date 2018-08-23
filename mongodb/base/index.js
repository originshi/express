

let {url}=require("./connect");
let {MongoClient,ObjectId}=require('mongodb');
let client=MongoClient;
// let client=require("mongodb").MongoClient;
// let ObjectId = require('mongodb').ObjectID;
function newDataBase({dataBase}){
    client.connect(`${url}${dataBase}`,(err,db)=>{
        if(err) throw err;
        console.log("创建数据库")
    })
}

function newCollection({dataBase,collectionName}){
    client.connect(`${url}${dataBase}`,(err,db)=>{
        if(err) throw err;
        let dBase=db.db(dataBase);
        dBase.createCollection(collectionName,(err,res)=>{
            if(err) throw err;
            console.log("创建集合");
            db.close();
        })
    })
}

function deleteCollection({dataBase,collectionName}){
    client.connect(`${url}${dataBase}`,(err,db)=>{
        if(err) throw err;
        let dBase=db.db(dataBase);
        dBase.collection(collectionName).drop((err,res)=>{
            if(err) throw err;
            console.log("删除集合");
            db.close();
        })
    })
}

function insertData({dataBase,collectionName,data}){
    client.connect(`${url}${dataBase}`,(err,db)=>{
        if(err) throw err;
        let dBase=db.db(dataBase);
        if(data instanceof Array){
            dBase.collection(collectionName).insertMany(data,(err,res)=>{
                if(err) throw err;
                console.log("插入成功")
                db.close();
             })
        }else{
            dBase.collection(collectionName).insertOne(data,(err,res)=>{
                if(err) throw err;
                console.log("插入成功")
                db.close();
             })
        }
        
    })
}

function selectData({dataBase,collectionName,data}){
    return new Promise((resolve,rej)=>{
        client.connect(`${url}${dataBase}`,(err,db)=>{
            if(err) throw err;
            let dBase=db.db(dataBase);
            dBase.collection(collectionName).find(data).toArray((err,res)=>{
               if(err) {
                  rej(err)
                  return;
               };
               console.log("查询成功",res)
               resolve(res)
               db.close();
            })
        })
    })   
}

function updateData({dataBase,collectionName,data,updateData,ismore=false}){
    return new Promise((resolve,rej)=>{
        client.connect(`${url}${dataBase}`,(err,db)=>{
            if(err) throw err;
            let dBase=db.db(dataBase);
            if(!ismore){
                dBase.collection(collectionName).update(data,updateData,(err,result)=>{
                    if(err) {
                        rej({msg:"更新失败",err})
                        return;
                    };
                    console.log("更新成功")
                    resolve({msg:"更新成功",result})
                    db.close();
                 })
            }else{
                dBase.collection(collectionName).updateMany(data,updateData,(err,result)=>{
                    if(err) {
                        rej({msg:"更新失败",err})
                        return;
                    };
                    console.log("更新成功")
                    resolve({msg:"更新成功",result})
                    db.close();
                 })
            }
            
        })
    })
}
function deleteData({dataBase,collectionName,data,ismore=false}){
    client.connect(`${url}${dataBase}`,(err,db)=>{
        if(err) throw err;
        let dBase=db.db(dataBase);
        if(!ismore){
            dBase.collection(collectionName).deleteOne(data,(err,res)=>{
                if(err) throw err;
                console.log(res.deletedCount)
                console.log("删除成功")
                db.close();
             })
        }else{
            dBase.collection(collectionName).deleteMany(data,(err,res)=>{
                if(err) throw err;
                console.log("删除成功")
                db.close();
             })
        }
        
    })
}

function aggregate({dataBase,collectionName,linkcollectionName,localkey,fromkey,newType,data}){
    console.log(dataBase,collectionName,linkcollectionName,localkey,fromkey,newType,data)
    client.connect(`${url}${dataBase}`,(err,db)=>{
        if(err) throw err;
        let dBase=db.db(dataBase);
        
            dBase.collection(collectionName).aggregate([
                { $lookup:
                    {
                        from: linkcollectionName,           
                        localField: localkey,   
                        foreignField: fromkey,        
                        as: newType      
                    }
                },
                {$match:data}
            ],(err,res)=>{
               if (err)  
                   throw err;
                   
                res.each((err,doc)=>{
                    console.log("找到了",doc)
                 })
                

            })
        
        
    })
    
}

module.exports={newDataBase,
    newCollection,
    deleteCollection,
    insertData,
    selectData,
    updateData,
    deleteData,
    aggregate,
    ObjectId
}


