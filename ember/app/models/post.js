import DS from 'ember-data';

const config = {
	author:  {
		defaultValue: 'Wes Moberly',
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
	author:       DS.attr( 'string', config.author ),
	isDraft:      DS.attr( 'boolean', config.isDraft ),
	datePosted:   DS.attr( 'date', config.date ),
	dateModified: DS.attr( 'date', config.date ),
});
