console.log("WebSocket server is starting...");

const { WebSocketServer } = require("ws");
const server = new WebSocketServer({ port: 5000 });

server.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (data) => {
    // Echo the message back to the client
    const sent_data = JSON.parse(data);
    console.log(`${sent_data.chat_message}`);
    setInterval(() => {
      socket.send(`
            <div id ="chat_box" hx-swap-oob="beforeend" >           
                <h3> ${sent_data.chat_message} </h3>
            </div>
        `);
    },1000); // Send every second

 
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
console.log("WebSocket server is running on port 5000");