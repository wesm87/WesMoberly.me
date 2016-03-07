`import DS from 'ember-data'`

PortfolioItemModel = DS.Model.extend(

	title:        DS.attr 'string'
	content:      DS.attr 'string'
	client:       DS.attr 'string'
	siteURL:      DS.attr 'string'
	image:        DS.attr 'string', defaultValue: 'http://placehold.it/640x480'
	isDraft:      DS.attr 'boolean', defaultValue: true
	datePosted:   DS.attr 'date', defaultValue: -> new Date()
	dateModified: DS.attr 'date', defaultValue: -> new Date()

)

`export default PortfolioItemModel`
