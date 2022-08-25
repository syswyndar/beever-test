const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const router = require("./routes/index");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const socket = require("./middleware/socketio");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is connected",
  });
});

io.on("connection", (socket) => {
  console.log("connected");
});

app.use(socket(io));

server.listen(PORT, () => {
  console.log(`server listen on ${PORT}`);
});
