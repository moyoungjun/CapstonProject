import io from "socket.io-client";

const socket = io.connect("http://202.31.243.19:8080/chat");

//메세지 받기
function msgOn(cb) { 
    socket.on('chat', data => {
        cb(data);
    });
}

//유저 정보 전달
function userView(cb) {
    socket.on('sysmsg', message => {

        const output = {userId : message.userId, date :  message.date, time : 'N', sysmsg: message.sysmsg}
        cb(output);
   
    })
}
//메세지 보내기
function msgEmit(msg) {
    socket.emit('chat', msg);
}

export {msgOn, msgEmit, userView};