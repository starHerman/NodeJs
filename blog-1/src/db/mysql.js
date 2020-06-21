const mysql=require('mysql')

const {MSQL_CONF} =require('../conf/db')

const con=mysql.createConnection(MSQL_CONF);



con.connect();



//执行sql函数

function exec(sql){

    const promise=new Promise((resolve,reject)=>{
         con.query(sql, (err, result) => {
           if (err) {
             reject(err);
             return;
           }
          resolve(result)
         })

    })
    return promise;
}


module.exports={
    exec
}