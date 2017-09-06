const router = require('express').Router()

router.route('/new-review')
  .get((req, res) => {
    res.render('new-review')
  })

router.route('/sign-out')
  .get((req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error('Error destroying session')
        throw error
      } else res.redirect('/')
    })
  })

module.exports = router
