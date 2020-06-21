const env=process.env.NODE_ENV;
//configuration
let MSQL_CONF={}
let REDIS_CONF={}
if(env==='dev'){
        MSQL_CONF={
        host:'localhost',
        user:'root',
        password:'goforit1314',
        port:'3306',
        database:'myblog'
    }
    REDIS_CONF={
        port:6379,
        host:'127.0.0.1'
    }
}

if(env==='production'){
     MSQL_CONF = {
       host: "localhost",
       user: "root",
       password: "goforit1314",
       port: "3306",
       database: "myblog"
     }; 
     REDIS_CONF = {
          port: 6379,
          host: "127.0.0.1",
        };
}

module.exports = {
    MSQL_CONF,
    REDIS_CONF
};