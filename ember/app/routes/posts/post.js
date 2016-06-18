import Ember from 'ember';

export default Ember.Route.extend({

	serialize( model ) {
		return {
			slug: model.get( 'slug' ),
		};
	},

	model( params ) {
		this.store.findRecord( 'post', params.post_id );
	}

});
