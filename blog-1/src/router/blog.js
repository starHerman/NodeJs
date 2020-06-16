const {getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog}=require('../controller/blog');
const {SuccessModel,ErrorModel}=require('../model/resModel')
const handleBlogRouter=(req,res)=>{
    const method=req.method;
    const url=req.url;
    const path=url.split('?')[0];
    const id = req.query.id;
    if(method==='GET'&&path==='/api/blog/list'){
        const author=req.query.author||'';
        const keyword=req.query.keyword||'';
        const listData=getList(author,keyword);
        console.log(req.query);
        return new SuccessModel(listData);
    }
    if(method==='GET'&&path==='/api/blog/detail'){
       
       const data=getDetail(id);
       return new SuccessModel(data);
    }
    if(method==='POST'&&path==='/api/blog/new'){
        const blogData=req.body;
        const data=newBlog(blogData);
        console.log('sa',data);
        return new SuccessModel(data);
    }
    if(method==='POST'&&path==='/api/blog/update'){
        const result=updateBlog(id,req.body);
        if(result){
            return new SuccessModel();
        }
        return new ErrorModel('更新失败');
    }
    if (method === 'POST' && path === '/api/blog/delete') {
        const result = delBlog(id);
        if (result) {
            return new SuccessModel();
        }
        return new ErrorModel('删除失败');
    }
}

module.exports=handleBlogRouter;