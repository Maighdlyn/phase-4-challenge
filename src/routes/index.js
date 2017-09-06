const router = require('express').Router()
const nonUser = require('./non-user')
const user = require('./user-only')

router.use((req, res, next) => {
  let loggedIn = false
  if (req.session.user) {
    loggedIn = true
  }
  res.locals = {loggedIn}
  next()
})

router.use('/', nonUser)
router.use('/', user)

module.exports = router
