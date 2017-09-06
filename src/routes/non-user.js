const router = require('express').Router()
const queries = require('../db/queries.js')

router.get('/', (req, res) => {
  queries.getAlbums()
    .then((albums) => {
      res.render('index', {albums})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

router.get('/sign-in', (req, res) => {
  res.render('sign-in')
})

router.post('/sign-in', (req, res) => {
  queries.getUserByEmail(req.body.email)
    .then((user) => {
      if (user.password === req.body.password) {
        req.session.user = user
        req.session.save((error) => {
          if (error) {
            console.error('Error saving session')
            throw error
          } else res.redirect(`/users/${user.user_id}`)
        })
      } else { console.error('Incorrect password') }
    })
})


router.get('/sign-up', (req, res) => {
  res.render('sign-up')
})

router.post('/sign-up', (req, res) => {
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

router.route('/users/:id')
  .get((req, res) => {
    queries.getReviewsByUserId(req.params.id)
      .then((reviewsAndUser) => {
        // console.log(reviewsAndUser);
        res.render('profile', {reviewsAndUser})
      })
  })

router.get('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId
  queries.getAlbumById(albumId)
    .then((album) => {
      res.render('album', {album})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

module.exports = router
