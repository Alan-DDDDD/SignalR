connect();
async function connect(){
var response = await fetch("https://3d23-61-222-180-215.ngrok-free.app/t", {
    method: "get",
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
  });
  var data = await response.json();
}
var connection = new signalR.HubConnectionBuilder().withUrl("https://3d23-61-222-180-215.ngrok-free.app/chathub").build();
connection.start().then(function () {
    console.log("Hub 連線完成");
}).catch(function (err) {
    alert('連線錯誤: ' + err.toString());
});

// 更新連線 ID 列表事件
connection.on("UpdList", function (jsonList) {
    var list = JSON.parse(jsonList);
    $("#IDList li").remove();
    for(i=0; i<list.length; i++)
    {
        $("#IDList").append($("<li></li>").attr("class", "list-group-item").text(list[i]));
    }
});

// 更新用戶個人連線 ID 事件
connection.on("UpdSelfID", function (id) {
    $('#SelfID').html(id);
});

// 更新聊天內容事件
connection.on("UpdContent", function (msg) {
    $("#Content").append($("<li></li>").attr("class", "list-group-item").text(msg));
});

//傳送訊息
$('#sendButton').on('click', function() {
    let selfID = $('#SelfID').html();
    let message = $('#message').val();
    let sendToID = $('#sendToID').val();
    let selfName = $(`#selfName`).val();
    connection.invoke("SendMessage", selfID, message, sendToID,selfName).catch(function (err) {
        alert('傳送錯誤: ' + err.toString());
    });
});