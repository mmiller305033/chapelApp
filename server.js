//1.) create http server
const PORT = process.env.PORT || 2525;
const INDEX = "/public/index.html";
const express = require("express");
const { createServer } = require("http");
const multer = require('multer’)

const app = express();
const httpServer = createServer(app);

// Static files
app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res, next) {
  res.sendFile(__dirname + INDEX);
});


// Image Routing
const upload = multer({
dest: 'images',
limits: {
fileSize: 1000000,
},
fileFilter(req, file, cb) {
if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
cb(new Error('Please upload an image.'))
}
cb(undefined, true)
}
});

router.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
  }, (error, req, res, next) => {
    res.status(400).send({error: error.message})
});


//2.) Create a websocket server
const { Server } = require("ws");
const wss = new Server({ server: httpServer });

//3.) Handle connections
wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});

//4.) Boradcast updates
setInterval(() => {
  wss.clients.forEach(client => {
    client.send(new Date().toTimeString());
  });
}, 1000);

httpServer.listen(PORT, () => console.log("Server started at http://localhost:" + PORT));
