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
    SELECT * FROM users WHERE LOWER(email) = LOWER($1)
    `, [email])
    .catch((error) => {
      console.error('\nError in queries.getUserByEmail\n')
      throw error
    })
}

const getReviewById = (id) => {
  return db.one('SELECT * FROM reviews WHERE review_id = $1', [id])
    .catch((error) => {
      console.error('\nError in queries.getReviewById\n')
      throw error
    })
}

const getReviewsByUserId = (userId) => {
  return db.many(`
    SELECT * FROM reviews
    RIGHT OUTER JOIN users
      ON reviews.user_id = users.user_id
    LEFT OUTER JOIN albums
      ON reviews.album_id = albums.id
    WHERE users.user_id = $1
    ORDER BY date_created DESC
    `, [userId])
    .catch((error) => {
      console.error('\nError in queries.getReviewsByUserId\n')
      throw error
    })
}

const getReviewsByAlbumId = (albumId) => {
  return db.many(`
    SELECT * FROM reviews
    JOIN users
      ON reviews.user_id = users.user_id
    RIGHT OUTER JOIN albums
      ON reviews.album_id = albums.id
    WHERE albums.id = $1
    ORDER BY date_created DESC
    `, [albumId])
    .catch((error) => {
      console.error('\nError in queries.getReviewsByAlbumId\n')
      throw error
    })
}

const getThreeReviewsAndAllAlbums = () => {
  return db.many(`
    SELECT * FROM reviews
      JOIN users
        ON reviews.user_id = users.user_id
      JOIN albums
        ON reviews.album_id = albums.id
      ORDER BY date_created DESC
      LIMIT 3;
    SELECT * FROM albums;
    `)
}

const createUser = (name, email, password) => {
  return db.none(`
    INSERT INTO
      users (name, email, password)
    VALUES
      ($1, $2, $3)
    `, [name, email, password])
}

const createReview = (content, userId, albumId) => {
  return db.none(`
    INSERT INTO reviews
      (content, user_id, album_id)
    VALUES
      ($1, $2, $3)
    `, [content, userId, albumId])
    .catch((error) => {
      console.error('\nError in queries.createReview\n')
      throw error
    })
}

const deleteReviewById = (reviewId) => {
  return db.none(`
    DELETE FROM reviews
      WHERE review_id = $1
    `, [reviewId])
    .catch((error) => {
      console.error('\nError in queries.createReview\n')
      throw error
    })
}

module.exports = {
  getAlbums,
  getAlbumById,
  createUser,
  getUserByEmail,
  getReviewsByUserId,
  deleteReviewById,
  getReviewById,
  getReviewsByAlbumId,
  createReview,
  getThreeReviewsAndAllAlbums
}
