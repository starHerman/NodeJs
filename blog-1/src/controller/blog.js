const {exec} =require('../db/mysql')
const getList=(author,keyword)=>{
    //先返回假数据
    let sql=`select id ,title,content,author from blogs where 1=1 `;
    // if(author){
    //     console.log(111);
    // }
    //  if (keyword) {
    //    console.log(222);
    //  }
    if(author){
        sql+=`and author='${author}'`
    }
    if(keyword){
        sql+=`and title like '%${keyword}%' `
    }
        sql+= `order by createtime desc;`

    return exec(sql);
}
const getDetail=(id)=>{
    let sql=`select * from blogs where 1=1 `;
    if(id){
        sql+=`and id='${id}' `;
    }
    return exec(sql).then(rows=>{
        return rows[0];
    });
}

const newBlog=(postData={})=>{
    const title=postData.title;
    const content=postData.content;
    const author=postData.author;
    const createtime=Date.now();
    const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}');`;
    return exec(sql).then(data=>{
        console.log(data);
        return data.insertId;
    })
}
const updateBlog=(id,blogData={})=>{
    const title=blogData.title;
    const content=blogData.content;
    const sql=`update blogs set title='${title}',content='${content}' where id='${id}';`;
    return exec(sql).then(updateData=>{
        console.log(updateData);
        if(updateData.affectedRows>0){
            return true;
        }
        return false;
    })
}
const delBlog=(id,author)=>{
    const sql=`delete from blogs where id='${id}' and author='${author}'`;
    return exec(sql).then(delData=>{
        if(delData.affectedRows>0){
            return true;
        }
        return false;
    });
}

module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}