###
# PortfolioItem model + schema
###

# Dependencies
slugify       = require 'slug'
mongoose      = require 'mongoose'
autoIncrement = require 'mongoose-auto-increment'


# Schema options
options =
	timestamps:
		createdAt: 'datePosted'
		updatedAt: 'dateModified'

# Schema properties + types
properties =
	title:
		type:     String
		required: true
	content:
		type:     String
		required: false
	client:
		type:     String
		required: false
	image:
		type:     String
		required: false
	siteURL:
		type:     String
		required: false
	isDraft:
		type:     Boolean
		default:  true

# Create the schema
schema = new mongoose.Schema( properties, options )

# Add virtual property getters & setters
schema.virtual( 'slug' ).get( -> slugify( @title, lower: true ) )

# Add auto-incrementing numeric post ID
schema.plugin( autoIncrement.plugin,
	model:   'portfolio-item'
	field:   'itemID'
	startAt: 1
)

module.exports = mongoose.model( 'portfolio-item', schema )
