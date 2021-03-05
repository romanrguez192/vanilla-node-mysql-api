const mysql = require("mysql");
require("dotenv").config();

// Crea la conexión con MySQL
const pool = mysql.createPool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});

const songModel = {};

// Encontrar todas las canciones
songModel.findAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM songs", (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve(results);
    });
  });
};

// Encontrar una canción
songModel.findById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM songs WHERE id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve(results[0]);
    });
  });
};

// Crear una canción
songModel.create = (song) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO songs (name, artist, year, genre, length, label) VALUES (?, ?, ?, ? , ?, ?)",
      [song.name, song.artist, song.year, song.genre, song.length, song.label],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve({ id: result.insertId, ...song });
      }
    );
  });
};

// Actualizar una canción
songModel.update = (id, song) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE songs SET name = ?, artist = ?, year = ?, genre = ?, length = ?, label = ? WHERE id = ?",
      [
        song.name,
        song.artist,
        song.year,
        song.genre,
        song.length,
        song.label,
        id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve({ id, ...song });
      }
    );
  });
};

// Borrar una canción
songModel.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM songs WHERE id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

module.exports = songModel;
