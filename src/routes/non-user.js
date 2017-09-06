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

//   (() => {
//     if (error) {
//       res.status(500).render('error', {error})
//     } else {
//       res.render('index', {albums})
//     }
//   })
// })

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

router.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      res.render('album', {album})
    }
  })
})

module.exports = router
