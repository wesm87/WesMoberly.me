import Ember from 'ember';

export default Ember.Route.extend({

	model() {
		return Ember.RSVP.hash({
			portfolioItems: this.store.findAll( 'portfolio-item' ),
			posts: this.store.findAll( 'post' )
		});
	},

	setupController( controller, model ) {
		controller.setProperties( model );
	}

});
