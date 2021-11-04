let websock = null;
let global_callback = null;
let curIP={}
if (process.env.NODE_ENV === "production") {
  //生产环境
  console.log("生产环境")
  curIP = {
    java_cur_ip: "ws://182.43.223.185:8080/hdpmwork/gztbch_hd/one",
  };
} else {
  //开发环境
  console.log("开发环境")
  curIP = {
    java_cur_ip: "ws://182.43.223.185:8080/hdpmwork/gztbch_hd/one",
  };
}
function initWebSocket(){ //初始化weosocket
  //ws地址
  let wsuri = curIP.java_cur_ip;
  websock = new WebSocket(wsuri);
  websock.onmessage = function(e){
    websocketonmessage(e);
  }
  websock.onclose = function(e){
    websocketclose(e);
  }
  websock.onopen = function () {
    websocketOpen();
  }

  //连接发生错误的回调方法
  websock.onerror = function () {
    console.log("WebSocket连接发生错误");
  }
}

// 实际调用的方法agentData参数,callback成功回调
function sendSock(agentData,callback){
  global_callback = callback;
  if (websock.readyState === websock.OPEN) {
    //若是ws开启状态
    websocketsend(agentData)
  }else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData,callback);
    }, 1000);
  }else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData,callback);
    }, 1000);
  }
}

//数据接收
function websocketonmessage(e){
  global_callback(JSON.parse(e.data));
}

//数据发送
function websocketsend(agentData){
  websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e){
  console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e){
  console.log("连接成功");
}

initWebSocket();

export{sendSock}

