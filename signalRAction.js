var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.start().then(function () {
    console.log("Hub 連線完成");
}).catch(function (err) {
    alert('連線錯誤: ' + err.toString());
});