// tests/album-create.js
const { expect } = require("chai");
const request = require("supertest");
const getDb = require("../src/services/db");
const app = require("../src/app");

describe("create album", () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query("DELETE FROM Album");
    await db.close();
  });

  describe("/album", () => {
    describe("POST", () => {
      it("creates a new album in the database", async () => {
        const resArtist = await request(app).post("/artist").send({
          name: "Tame Impala",
          genre: "rock",
        });

        const resAlbum = await request(app).post("/artist/1/album").send({
          name: "Currents",
          year: 2015,
        });
        console.log(resAlbum);

        expect(resArtist.status).to.equal(201);
        expect(resAlbum.status).to.equal(201);

        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE name = 'Currents'`
        );
        console.log(albumEntries);

        expect(albumEntries.name).to.equal("Currents");
        expect(albumEntries.year).to.equal(2015);
      });
    });
  });
});
