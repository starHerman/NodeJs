const handleBlogRouter=require('./src/router/blog');
const handleUserRouter=require('./src/router/user');
const querystring=require('querystring');
const {get,set}=require('./src/db/redis')
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log(d.toGMTString());
  return d.toGMTString();
};

//session 

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
    //解析cookie
    req.cookie={};
    const cookieStr=req.headers.cookie||'';
    cookieStr.split(';').forEach(item=> {
        if(!item){
            return;
        }
        const arr=item.split('=');
        const key=arr[0].trim();
        const val=arr[1].trim();
        req.cookie[key]=val;
        
    });
    //解析 session  
    let userId=req.cookie.userid;
    let needSetCookie=false;
    //req.session={}
    
    if(!userId){
        needSetCookie=true;
        userId = `${Date.now()}_${Math.random()}`;
    }
     req.sessionId = userId;
        get(userId).then(val=>{
            //console.log(val.username);
            if(val==null){
                set(req.sessionId,{});
                req.session={}
                //console.log(req.session)
            }
            else {
                req.session=val;
            }  
            return getPostData(req)
        }).then(postData=>{
        req.body=postData;

        //blog 路由
        const blogResult = handleBlogRouter(req, res);
        if(blogResult){
             blogResult.then((blogData) => {
                 if(needSetCookie){
                     res.setHeader(
                       "Set-Cookie",
                       `userid=${
                         userId
                       };path=/;httpOnly;expires=${getCookieExpires()}`
                     );
                 }
                 res.end(JSON.stringify(blogData));
             })
             return
        }
        // const blogData = handleBlogRouter(req, res);
        // if (blogData) {
        //     res.end(JSON.stringify(blogData));
        //     return;
        // }

        //user 路由
        const userResult = handleUserRouter(req, res);
        if(userResult){
             userResult.then((userData) => {
                 if(needSetCookie)
                 res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
               res.end(JSON.stringify(userData));
             });
             return;
        }
       
        
        res.writeHeader(404, { "Content-type": "text/plain" });
        res.write('404 NOT FOUND');
        res.end();
    })
    
    }
    //console.log(sessionVal)



module.exports=serverHandle;