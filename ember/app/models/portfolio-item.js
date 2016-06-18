import DS from 'ember-data';

const config = {
	image:  {
		defaultValue: 'http://placehold.it/640x480',
	},

	isDraft: {
		defaultValue: true,
	},

	date: {
		defaultValue() {
			return new Date();
		}
	},
};

export default DS.Model.extend({
	title:        DS.attr( 'string' ),
	content:      DS.attr( 'string' ),
	client:       DS.attr( 'string' ),
	siteURL:      DS.attr( 'string' ),
	image:        DS.attr( 'string', config.image ),
	isDraft:      DS.attr( 'boolean', config.isDraft ),
	datePosted:   DS.attr( 'date', config.date ),
	dateModified: DS.attr( 'date', config.date ),
});
