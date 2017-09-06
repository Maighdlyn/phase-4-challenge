const pgp = require('pg-promise')()

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAlbums = () => {
  return db.query('SELECT * FROM albums')
}

const getAlbumById = (albumId) => {
  return db.one(`
    SELECT * FROM albums
      WHERE id = $1
    `, [albumId])
}

const getUserByEmail = (email) => {
  return db.one(`
    SELECT * FROM users WHERE email = $1
    `, [email])
    .catch((error) => {
      console.error('\nError in queries.getUserByEmail\n')
      throw error
    })
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
  createUser,
  getUserByEmail
}
