import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'span',

	classNames: [
		'nav-item',
		'nav-link',
	],

	session: Ember.inject.service(),

	icon() {
		const session = this.get( 'session' );

		if ( session && session.isAuthenticated ) {
			return 'check-circle';
		}

		return 'minus-circle';
	}
});
