`import DS from 'ember-data'`

BlogPostModel = DS.Model.extend(

	title:        DS.attr 'string'
	content:      DS.attr 'string'
	author:       DS.attr 'string', defaultValue: 'Wes Moberly'
	isDraft:      DS.attr 'boolean', defaultValue: true
	datePosted:   DS.attr 'date', defaultValue: -> new Date()
	dateModified: DS.attr 'date', defaultValue: -> new Date()

)

`export default BlogPostModel`
