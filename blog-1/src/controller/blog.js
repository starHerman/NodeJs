const getList=(author,keyword)=>{
    //先返回假数据
    return [
        {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime:'1592259951701',
        author:'作者A'
    },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: '1592260009221',
            author: '作者A'
        }]
}
const getDetail=(id)=>{
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: '1592259951701',
        author: '作者A'
    }
}

const newBlog=(postData={})=>{
    console.log('new Blog data:',postData);
    return {
        id:3
    }
}
const updateBlog=(id,blogData={})=>{
    console.log('update blog',id,blogData)
    return true;
}
const delBlog=(id)=>{
    return true;
}

module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}