# Websocket

1. 什么是 Websocket,  有什么用;

2. 客户端API和服务端API；

3. WebSocket 的应用与实践;

4. 微信小程序中Websocket实践；


## 什么是 Websocket

官网[http://websocket.org](http://websocket.org)

### Websocket 出现的背景

构建网络应用的过程中，我们经常需要与服务器进行持续的通讯以保持双方信息的同步。通常这种持久通讯在不刷新页面的情况下进行，消耗一定的内存资源常驻后台，并且对于用户不可见。在 WebSocket 出现之前，常常采用传统轮询的方式

缺陷： 程序在每次请求时都会新建一个HTTP请求，然而并不是每次都能返回所需的新数据。当同时发起的请求达到一定数目时，会对服务器造成较大负担。


WebSocket是一种在单个TCP连接上进行**全双工通信的协议**。WebSocket通信协议于2011年被IETF定为标准RFC 6455，并由RFC7936补充规范。WebSocket API也被W3C定为标准。

它的最大特点就是，**服务器可以主动向客户端推送信息**，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于**服务器推送技术**的一种。


WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

HTML5定义了WebSocket协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。

### 特点

+ 服务器和客户端都可以主动推送消息；
+ 建立在TCP协议之上；
+ 与HTTP协议兼容性良好，默认端口也是80和443；
+ 数据格式比较轻量，性能开销小，通信高效；
+ 更强的实时性；
+ 没有同源策略，客户端可以与任意服务器通信；
+ 协议标识符为`ws` (如果加密则为 `wss`)    ws://xxxx.xx?key=value


### 协议

http  ws ftp

tcp    =>  ws =>  http

udp  不可靠


WebSocket协议被设计来取代现有的使用HTTP作为传输层的双向通信技术，并受益于现有的基础设施（代理、过滤、身份验证）。

握手和数据传输



#### 客户端：请求协议升级

请求状态码 101 ( http://tool.oschina.net/commons?type=5)

服务器已经理解了客户端的请求，并将通过Upgrade 消息头通知客户端采用不同的协议来完成这个请求。在发送完这个响应最后的空行后，服务器将会切换到在**Upgrade** 消息头中定义的那些协议。

只有在切换新的协议更有好处的时候才应该采取类似措施。例如，切换到新的HTTP 版本比旧版本更有优势，或者切换到一个实时且同步的协议以传送利用此类特性的资源。



**101**





首先，客户端发起协议升级请求。可以看到，采用的是标准的 HTTP 报文格式，且只支持GET方法。

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

- Connection: Upgrade：表示要升级协议
- Upgrade: websocket：表示要升级到 websocket 协议。
- Sec-WebSocket-Version: 13：表示 websocket 的版本。如果服务端不支持该版本，需要返回一个 `Sec-WebSocket-Versionheader` ，里面包含服务端支持的版本号。
- Sec-WebSocket-Key：与后面服务端响应首部的 `Sec-WebSocket-Accept` 是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。



#### 服务端：响应协议升级

```
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
```

`Sec-WebSocket-Accept` 根据客户端请求首部的 `Sec-WebSocket-Key` 计算出来



### 数据传递

一旦 WebSocket 客户端、服务端建立连接后，后续的操作都是基于数据帧的传递。

#### 数据分片

WebSocket 的每条消息可能被切分成多个数据帧。当 WebSocket 的接收方收到一个数据帧时，会根据FIN的值来判断，是否已经收到消息的最后一个数据帧。

#### 连接保持 + 心跳

WebSocket 为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的 TCP 通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。

但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。

- 发送方 ->接收方：ping
- 接收方 ->发送方：pong

ping、pong 的操作，对应的是 WebSocket 的两个控制帧

#### 关闭连接

一旦发送或接收到一个Close控制帧，这就是说，_WebSocket 关闭阶段握手已启动，且 WebSocket 连接处于 CLOSING 状态。

当底层TCP连接已关闭，这就是说 WebSocket连接已关闭 且 WebSocket 连接处于 CLOSED 状态。 如果 TCP 连接在 WebSocket 关闭阶段已经完成后被关闭，WebSocket连接被说成已经 完全地 关闭了。



## 客户端API和服务端API

[MDN WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

### 客户端

```js
var ws = new WebSocket('ws://localhost:8080');
// wx.readyState 只读
// CONNECTING		0	连接还没开启。
// OPEN					1	连接已开启并准备好进行通信。
// CLOSING			2	连接正在关闭的过程中。
// CLOSED				3	连接已经关闭，或者连接无法建立。

ws.onopen = function () {
  ws.send('Hello Server!');
}

ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```

Connect

onopen / onmessage / onclose / onerror

close / send



#### 服务端

常用的 Node 实现

+ [ws](http://socket.io/)

- [Socket.IO](http://socket.io/)
- [µWebSockets](https://github.com/uWebSockets/uWebSockets)
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)
- [express-ws](https://www.npmjs.com/package/express-ws)



Net



WebSocket 是基于 TCP 的独立的协议。它与 HTTP 唯一的关系是它的握手是由 HTTP 服务器解释为一个 Upgrade 请求。



## Websocket应用

H5 Demo http://websocket.org/echo.html

```javascript
/*
	服务端创建Socket服务
*/

const app = require('express')();
const http = require('http').createServer(app);

// 创建socket服务
const io = require('socket.io')(http);

// 有新的连接，返回一个socket连接实例
io.on('connection', (socket) => {
  console.log('new user');
  socket.on('event', (msg) => { })	// 实例对象方法监听
  socket.on('disconnect', (msg) => { }) // 实例断开连接

  socket.broadcast.emit('hi'); // 除了当前用户，其他用户推送消息
})

// 服务端主向客户端推送消息
io.emit('event name') // 向所有用户推送消息

```

```javascript
/*
	客户端创建连接

	1. 引用socket client文件
	<script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"></script>
*/
var socket = io();
socket.emit('chat message', 'hello'); // 客户端向服务端发消息
socket.on('event name', function(msg){ // 接收服务端发送的消息
  console.log(msg)
})

```

基于 Node、WebSocket 的手机控制电脑实例

https://juejin.im/post/59bccffa5188257e764c8216



基于 nodejs 的 webSockt （socket.io）

https://juejin.im/post/5a2668e551882578da0dba2f

### 微信小程序websocket 使用

```js
// https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.connectSocket.html
wx.connectSocket({
  url: 'wss://example.qq.com',
  header:{
    'content-type': 'application/json'
  },
  protocols: ['protocol1']
})
```

[微信小程序相关API文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.connectSocket.html)


结后语:

如果今天你只能记住一件事，请记住 WebSocket是采用全双工通信的协议的一种服务器推送技术；创建websocket的过程先通过http请求(成功状态码为101)建立连接，后续的消息出来均通过 `ws`协议；websocket实例有两个属性方法: `close` `send` 和 4个监听方法 `open`(服务端可能是`connention`) `message` `message` `error`；





### socket.io

https://socket.io/docs/



服务端

https://flask-socketio.readthedocs.io/en/latest/



参考链接

[http://websocket.org 官网](http://websocket.org/aboutwebsocket.html)

[websocket详解](https://segmentfault.com/a/1190000012948613)

[HTTP1.0、HTTP1.1 和 HTTP2.0 的区别](https://juejin.im/entry/5981c5df518825359a2b9476)

[浅析TCP和nodejs中TCP的简单应用](https://juejin.im/post/5ac9f97b6fb9a028bc2e0501#heading-1)

[编写 WebSocket 服务器](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)

[node之tcp篇入门理解](https://juejin.im/post/5b1b5bdef265da6e52391d4e)

[基于 node+socket.io+redis 的多房间多进程聊天室](https://juejin.im/entry/584e3e0c61ff4b006cd21210)

[Node.js 网络编程](https://juejin.im/post/5d5698e8f265da03b8105bdd)

[socket.io  实践](https://juejin.im/post/5bce886af265da0ac07c8ef8)