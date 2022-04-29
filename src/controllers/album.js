const getDb = require("../services/db");

// creates a new album
exports.create = async (req, res) => {
  const db = await getDb();
  const { name, year } = req.body;
  const { albumId } = req.params;

  try {
    await db.query("INSERT INTO Album (name, year, albumId) VALUES (?, ?, ?)", [
      name,
      year,
      albumId,
    ]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

// returns all albums
exports.read = async (_, res) => {
  const db = await getDb();
  try {
    const [album] = await db.query("SELECT * FROM Album");

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

// returns a specific album by Id
exports.readById = async (req, res) => {
  const db = await getDb();
  const { albumId } = req.params;

  const [[album]] = await db.query("SELECT * FROM Album WHERE id = ?", [
    albumId,
  ]);

  if (!album) {
    res.sendStatus(404);
  } else {
    res.status(200).json(album);
  }

  db.close();
};
