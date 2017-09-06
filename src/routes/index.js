const router = require('express').Router()
const nonUser = require('./non-user')
const user = require('./user-only')

router.use((req, res, next) => {
  let loggedIn = false
  let userId = null
  if (req.session.user) {
    loggedIn = true
    userId = req.session.user.user_id
  }
  res.locals = {loggedIn, userId}
  next()
})

router.use('/', nonUser)
router.use('/', user)

module.exports = router
