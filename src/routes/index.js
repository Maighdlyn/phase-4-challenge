const router = require('express').Router()
const nonUser = require('./non-user')
const user = require('./user-only')

router.use((req, res, next) => {
  console.log('middleware stuff')
  next()
})

router.use('/', nonUser)
router.use('/', user)

module.exports = router
