import Ember from 'ember';

export default Ember.Component.extend({

	session: Ember.inject.service(),

	actions: {

		authenticateWithFacebook() {
			this.get( 'session' ).authenticate( 'authenticator:torii', 'facebook' );
		},

	},

});
