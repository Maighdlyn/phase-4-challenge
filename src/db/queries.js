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

function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

function _query(sql, variables, cb) {
  client.query(sql, variables, (error, result) => {
    if (error) {
      console.warn('QUERY -> !!ERROR!!')
      console.error(error)
      cb(error)
    } else {
      cb(error, result.rows)
    }
  })
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  db
}
