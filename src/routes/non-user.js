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

router.get('/sign-up', (req, res) => {
  res.render('sign-up')
})

router.post('/sign-up', (req, res) => {
  console.log('In the sign-up post');
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  queries.createUser(name, email, password)
    .then(res.redirect('/sign-in'))
    .catch((error) => {
      console.error('Error in non-user.createUser')
      throw error
    })
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
