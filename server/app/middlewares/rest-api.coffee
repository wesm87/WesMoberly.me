###
# JSON REST API middleware
###

# Dependencies
_ = require 'lodash'

# Middleware
module.exports = ( req, res, next ) ->

	# Set Content-Type header for all API responses
	res.type 'Content-Type: application/vnd.api+json'

	# Method to send a generic error response
	res.sendError = ( errorCode = 'rest-api-server-error' ) ->
		res.status( 500 ).type( 'json').json(
			errors: [
				status: '500 Internal Server Error'
				code:   errorCode
			]
		)

	res.send404 = ( errorCode = 'rest-api-resource-not-found' ) ->
		res.status( 404 ).type( 'json' ).json(
			errors: [
				status: '404 Not Found'
				code:   errorCode
			]
		)

	# Method to format and send Mongoose query results
	res.sendResults = ( results ) ->

		return res.send404() unless results?

		if _.isArray results
			results = _.map results, res.formatDataItem
		else
			results = res.formatDataItem results

		res.type( 'json').json(
			data: results
			links:
				self: req.originalUrl
		)

	# Move on to the next middleware
	next()
