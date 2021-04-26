const http = require("http");
const {
  getSongs,
  getSong,
  addSong,
  updateSong,
  deleteSong,
} = require("./controllers/songController");
require("dotenv").config();

const server = http.createServer((req, res) => {
  // GET /api/songs
  if (req.url === "/api/songs" && req.method === "GET") {
    getSongs(req, res);
  }
  // GET /api/songs/:id
  else if (req.url.match(/^\/api\/songs\/\w+\/?$/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getSong(req, res, id);
  }
  // POST /api/songs
  else if (req.url === "/api/songs" && req.method === "POST") {
    addSong(req, res);
  }
  // PUT /api/songs/:id
  else if (req.url.match(/^\/api\/songs\/\w+\/?$/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateSong(req, res, id);
  }
  // DELETE /api/songs/:id
  else if (req.url.match(/^\/api\/songs\/\w+\/?$/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteSong(req, res, id);
  }
  // 404: Not found
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

// Puerto
const PORT = process.env.PORT || 3000;

// Inicio del servidor
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
