const gohttp = require('gohttp');
const wxkey = require('./gzhkey');

var token_api = `https://api.weixin.qq.com/cgi-bin/token`
    +`?grant_type=client_credential`
    +`&appid=${wxkey.appid}&secret=${wxkey.secret}`;

var menu_data={
    button:[
        {
            name:"发现",
            sub_button:[
                {
                    name:"朋友圈",
                    type:"click",
                    key:"friend"
                },
                {
                    name:"扫一扫",
                    type:"click",
                    key:"sweep"
                },
                {
                    name:"看一看",
                    type:"click",
                    key:"look"
                }
            ]
        },
        {
            name:"发图",
            type:"pic_weixin",
            key:"my-image"
        },
        {
            name:"send",
            type:"click",
            key:"send-msg"
        }
    ]
};

(async ()=>{
    /*
    await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，
    其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。
    若Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
    另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。
    */
    let ret=await gohttp.get(token_api);
    let t=JSON.parse(ret);
    if(t.access_token===undefined){
        console.log(ret);//如果未定义就输出错误代码
        process.exit(-1);//整个进程退出：-1是状态码
    }
    let create_menu_api=`https://api.weixin.qq.com/cgi-bin/menu/create`+`?access_token=${t.access_token}`;
    ret=await gohttp.post(create_menu_api,{
        body:menu_data,
        headers:{
            'content-type':'text/plain'
        }
    });
    console.log(ret);                   
})();


