const pg = require('pg')
const pgp = require('pg-promise')()

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)
const db = pgp(connectionString)

client.connect()

function getAlbums() {
  return db.query('SELECT * FROM albums')
}

function getAlbumById(albumId) {
  return db.one(`
    SELECT * FROM albums
      WHERE id = $1
    `, [albumId])
}

module.exports = {
  getAlbums,
  getAlbumById,
}
