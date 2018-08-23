async function haha(){
    var a=await  Promise.resolve('hasaigei'); 
    var c=await new Promise((res,rej)=>{
        setTimeout(()=>{
            res('yalitou')
        },3000)
        rej('yali')
    })
    return [a,c];
  }
//   haha().then((data)=>{console.log('shujushujushuju',data)},(err)=>{
//     console.log(err)
//   });

var jwt=require('jsonwebtoken');
var token=jwt.sign({foo:'foo'},'yalitou');
jwt.verify(token+'1','yalitou',function(err){
    if(err){
        console.log('err',err.name,err.message)
    }
})