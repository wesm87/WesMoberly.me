import Ember from 'ember';

export default Ember.Component.extend({

	tagName: '',
	route:   'index',
	icon:    undefined,

	text() {
		return this.get( 'route' ).capitalize();
	},

});
