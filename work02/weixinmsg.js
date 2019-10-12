const formatMsg = require('./fmtwxmsg');
function help() {
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}

/**
 * 处理用户发来的信息
 * 第一个参数是解析后的用户信息
 * 第二个参数是要返回的信息对象
 * 基本处理过程是：根据用户发来的信息判断信息类型并进行处理。
 */

function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
   //关键词自动回复（关键词一定是文本，所以是“text”类型）
    if (wxmsg.MsgType == 'text') {//设置要返回的信息类型是文本类型
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){
            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        }else if (wxmsg.Content == 'who'){
            retmsg.msg = '姓名：董晓倩 学号：2017011745';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else {//非关键词信息原样返回
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}
exports.userMsg = userMsg;
exports.help = help;
exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

