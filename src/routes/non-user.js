const router = require('express').Router()
// const db = require('../db')
const queries = require('../db/queries.js')

router.get('/', (req, res) => {
  queries.getAlbums()
    .then(albums => res.render('index', {albums}))
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

router.route('/sign-in')
  .get((req, res) => {
    res.render('sign-in')
  })

router.route('/sign-up')
  .get((req, res) => {
    res.render('sign-up')
  })

router.route('/profile/:profileId')
  .get((req, res) => {
    res.render('profile')
  })

router.get('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId
  queries.getAlbumById(albumId)
    .then(album => res.render('album', {album}))
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
