const pg = require('pg')
const pgp = require('pg-promise')()

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)
const db = pgp(connectionString)

client.connect()

const getAlbums = () => {
  return db.query('SELECT * FROM albums')
}

const getAlbumById = (albumId) => {
  return db.one(`
    SELECT * FROM albums
      WHERE id = $1
    `, [albumId])
}

const createUser = (name, email, password) => {
  return db.none(`
    INSERT INTO
      users (name, email, password)
    VALUES
      ($1, $2, $3)
    `, [name, email, password])
}

module.exports = {
  getAlbums,
  getAlbumById,
  createUser
}
