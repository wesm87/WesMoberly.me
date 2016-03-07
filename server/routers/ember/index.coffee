###
# Ember static router (for non-API requests)
###

# Dependencies
express = require 'express'

# Create router
router = express.Router()

# Route all requests to the Ember app
router.use ( req, res, next ) ->
	res.sendFile( "#{ __emberPath }/index.html" )

module.exports = router
