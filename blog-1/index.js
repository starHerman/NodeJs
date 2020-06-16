const handleBlogRouter=require('./src/router/blog');
const handleUserRouter=require('./src/router/user');
const querystring=require('querystring');
//处理post data
const  getPostData=(req)=>{
    const promise=new Promise((resolve,reject)=>{
        if(req.method!=='POST'){
            resolve({});
            return;
        }
        if(req.headers['content-type']!=='application/json'){
            resolve({});
            return;
        }
        let postData='';
        req.on('data',chunk=>{
            postData+=chunk.toString();
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData.toString()))
        })

    })
    return promise;
}
const serverHandle=(req,res)=>{
    res.setHeader("Content-type","application/json");
    const url=req.url;
    req.path=url.split('?')[0];
    //解析query
    req.query=querystring.parse(req.url.split("?")[1]);

    //处理postData
    getPostData(req).then(postData=>{
        req.body=postData;

        //blog 路由
        const blogData = handleBlogRouter(req, res);
        if (blogData) {
            res.end(JSON.stringify(blogData));
            return;
        }

        //user 路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(JSON.stringify(userData));
            return;
        }
        res.writeHeader(404, { "Content-type": "text/plain" });
        res.write('404 NOT FOUND');
        res.end();
    })
    

   

}

module.exports=serverHandle;