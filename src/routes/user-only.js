const router = require('express').Router()

router.route('/new-review')
  .get((req, res) => {
    res.render('new-review')
  })

module.exports = router
