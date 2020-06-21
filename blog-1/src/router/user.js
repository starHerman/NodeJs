const {login} =require('../controller/user')
const {SuccessModel,ErrorModel} =require('../model/resModel')
const {set} =require('../db/redis')
const handleUserRouter=(req,res)=>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    if(method==='POST'&&path==='/api/user/login'){
        const {username,password}=req.body;
       //  const { username, password } = req.query;
        const result=login(username,password)
        return result.then(data=>{
            if(data.username){
                req.session.username=data.username;
                req.session.realname=data.realname;
                set(req.sessionId,req.session);
               console.log(req.session);
                return new SuccessModel();
            }
            return new ErrorModel("登录失败");
        })
       
    }
   // login test
    if(method==='GET'&&path==='/api/user/login-test'){

        if(req.session.username){
             
            return Promise.resolve(new SuccessModel({session:req.session}));
        }
        return Promise.resolve(new ErrorModel("登录失败"));
    }

}

module.exports=handleUserRouter;