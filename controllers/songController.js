const Song = require("../models/songModel");
const { getPostData } = require("../utils");

// Obtener todas
const getSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(songs));
  } catch (error) {
    console.log(error);
  }
};

// Obtener una
const getSong = async (req, res, id) => {
  try {
    const song = await Song.findById(id);

    if (!song) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Song Not Found" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(song));
  } catch (error) {
    console.log(error);
  }
};

// Agregar una
const addSong = async (req, res) => {
  try {
    const body = await getPostData(req);

    const song = JSON.parse(body);

    const newSong = await Song.create(song);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newSong));
  } catch (error) {
    console.log(error);
  }
};

// Actualizar una (con put)
const updateSong = async (req, res, id) => {
  try {
    const body = await getPostData(req);

    const song = JSON.parse(body);

    const newSong = await Song.update(id, song);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newSong));
  } catch (error) {
    console.log(error);
  }
};

// Borrar una
const deleteSong = async (req, res, id) => {
  try {
    await Song.delete(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Song deleted" }));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSongs,
  getSong,
  addSong,
  updateSong,
  deleteSong,
};
