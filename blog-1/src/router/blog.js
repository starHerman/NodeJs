const {getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog}=require('../controller/blog');
const {SuccessModel,ErrorModel}=require('../model/resModel')

//登陆验证函数
const loginCheck=(req)=>{
     if(!req.session.username){
            return Promise.resolve(new ErrorModel("登录失败"));
        }
        
}
const handleBlogRouter=(req,res)=>{
    const method=req.method;
    const url=req.url;
    const path=url.split('?')[0];
    const id = req.query.id;
    if(method==='GET'&&path==='/api/blog/list'){
        let author=req.query.author||'';
        const keyword=req.query.keyword||'';
        // const listData=getList(author,keyword);
        // console.log(req.query);
        // return new SuccessModel(listData);
        if(req.query.isadmin){
            const loginCheckResult=loginCheck(req);
                if(loginCheckResult){
                    return loginCheckResult;
                }
                author=req.session.username;
        }
        const result=getList(author,keyword);
        return  result.then((listData)=>{
           console.log(listData)
            return new SuccessModel(listData);
        })
    }
    if(method==='GET'&&path==='/api/blog/detail'){
       const loginCheckResult=loginCheck(req);
        if(loginCheckResult){
            return loginCheckResult;
        }
       const  result=getDetail(id);
       return result.then(data=>{
             return new SuccessModel(data);
       })
      
    }
    if(method==='POST'&&path==='/api/blog/new'){
         const loginCheckResult = loginCheck(req);
         if (loginCheckResult) {
           return loginCheckResult;
         }
        req.body.author=req.session.username;
        const blogData=req.body;
        const result=newBlog(blogData);
        return result.then(data=>{
            return new SuccessModel(data);
        })
    }
    if(method==='POST'&&path==='/api/blog/update'){
         const loginCheckResult = loginCheck(req);
         if (loginCheckResult) {
           return loginCheckResult;
         }
        const result=updateBlog(id,req.body);
        return result.then(data=>{
            if (data) {
              return new SuccessModel();
            }
            return new ErrorModel("更新失败");
        })
    }
    if (method === 'POST' && path === '/api/blog/delete') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
          return loginCheckResult;
        }
        const author=req.session.username;
        const result = delBlog(id,author);
        return result.then(data=>{
            if (data) {
              return new SuccessModel();
            }
            return new ErrorModel("删除失败");
        })
    }
}

module.exports=handleBlogRouter;