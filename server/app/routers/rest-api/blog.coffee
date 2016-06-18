###
# JSON REST API blog endpoints
###

# Dependencies
_       = require 'lodash'
path    = require 'path'
express = require 'express'

# Import model
BlogPost = require "#{ __serverPath }/models/blog-post"

# Create router
router = express.Router()

BlogPost.register( router, '/blog' )

###
# Default middleware
router.use ( req, res, next ) ->

	# Get valid blog post data
	req.getData = ( inputData ) ->

		# Define an array of valid properties
		validProps = [
			'slug'
			'title'
			'content'
			'author'
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

		id: item.postID
		type: 'post'
		attributes: req.getData item

	# Move on to the next middleware
	next()

## CRUD Endpoints ##

# /api/v1/blog
router.route '/'

	# Get all posts
	.get ( req, res ) ->

		# Skip drafts
		conditions =
			isDraft: false

		# Find the posts and send the response
		BlogPost.find( conditions, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 200 ).sendResults( results )
		)

	# Create new post
	.post ( req, res ) ->

		# Get relevant from the request body
		inputData = req.getData( req.body )

		# Create the post and send the response
		BlogPost.create( inputData, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 201 ).sendResults( results )
		)

# /api/v1/blog/:item_id
router.route '/:post_id'

	# Get single post
	.get ( req, res ) ->

		# Get the specified post ID
		conditions =
			postID:  req.params.post_id

		# Find the post and send the response
		BlogPost.findOne( conditions, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 200 ).sendResults( results )
		)

	# Update single post
	.patch ( req, res ) ->

		# Get the specified post ID
		conditions =
			postID:  req.params.post_id

		# Get relevant data from the request body
		inputData = req.getData( req.body )

		BlogPost.findOneAndUpdate( conditions, inputData, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 201 ).sendResults( results )
		)

	# Delete single post
	.delete ( req, res ) ->

		# Get the specified post ID
		conditions =
			postID:  req.params.post_id

		# Delete the post and send the response
		BlogPost.findOneAndRemove( conditions, ( error, results ) ->
			if error
				res.sendError()
			else
				res.status( 204 ).sendResults( results )
		)
###

module.exports = router
