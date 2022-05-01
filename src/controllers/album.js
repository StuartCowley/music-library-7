const getDb = require("../services/db");

// creates a new album
exports.create = async (req, res) => {
  const db = await getDb();
  const { name, year } = req.body;
  const { artistId } = req.params;
  // console.log(artistId);

  try {
    await db.query(
      "INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)",
      [name, year, artistId]
    );

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

// patches an existing album by Id
exports.update = async (req, res) => {
  const db = await getDb();
  const data = req.body;
  const { albumId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      "UPDATE Album SET ? WHERE id = ?",
      [data, albumId]
    );

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }

  db.close();
};

// deletes an existing album by Id
exports.delete = async (req, res) => {
  const db = await getDb();
  const { albumId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      "DELETE FROM Album WHERE id = ?",
      [albumId]
    );

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }

  db.close();
};
