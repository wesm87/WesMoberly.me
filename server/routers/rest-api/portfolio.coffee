###
# JSON REST API portfolio endpoints
###

# Dependencies
_       = require 'lodash'
path    = require 'path'
express = require 'express'

# Import model
PortfolioItem = require "#{ __serverPath }/models/portfolio-item"

# Create router
router = express.Router()

# Default middleware
router.use ( req, res, next ) ->

	# Get valid portfolio item data
	req.getData = ( inputData ) ->

		# Define an array of valid properties
		validProps = [
			'slug'
			'title'
			'content'
			'client'
			'image'
			'siteURL'
			'isDraft'
			'datePosted'
			'dateModified'
		]

		# Grab the properties we need from the request data
		validData = _.pick( inputData, validProps )

		# Exclude properties that are null or undefined
		validData = _.omitBy( validData, _.isNil )

		return validData

	res.formatDataItem = ( item ) ->

		id: item.itemID
		type: 'portfolio-item'
		attributes: req.getData item

	# Move on to the next middleware
	next()

### CRUD endpoints ###

# /api/v1/portfolio
router.route '/'

	# Get all portfolio items
	.get ( req, res ) ->

		# Skip drafts
		conditions =
			isDraft: false

		# Find the items and send the response
		PortfolioItem.find( conditions, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 200 ).sendResults( results )
		)

	# Create new portfolio item
	.post ( req, res ) ->

		# Get relevant from the request body
		inputData = req.getData( req.body )

		# Create the item and send the response
		PortfolioItem.create( inputData, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 201 ).sendResults( results )
		)

# /api/v1/portfolio/:item_id
router.route '/:item_id'

	# Get single item
	.get ( req, res ) ->

		# Get specified item id
		conditions =
			itemID: req.params.item_id

		# Find item and send response
		PortfolioItem.findOne( conditions, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 200 ).sendResults( results )
		)

	# Update single item
	.patch ( req, res ) ->

		# Get specified item id
		conditions =
			itemID: req.params.item_id

		# Get relevant from the request body
		inputData = req.getData( req.body )

		# Update item and send response
		PortfolioItem.findOneAndUpdate( conditions, inputData, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 201 ).sendResults( results )
		)

	# Delete single item
	.delete ( req, res ) ->

		# Get specified item id
		conditions =
			itemID: req.params.item_id

		# Delete item and send response
		PortfolioItem.findOneAndRemove( conditions, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 204 ).sendResults( results )
		)

module.exports = router
