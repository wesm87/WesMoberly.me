###
# JSON REST API router
###

# Dependencies
express = require 'express'

# Create router
router = express.Router()

# Blog
blogRouter = require './blog'
router.use '/posts', blogRouter

# Portfolio
portfolioRouter = require './portfolio'
router.use '/portfolio-items', portfolioRouter

module.exports = router
