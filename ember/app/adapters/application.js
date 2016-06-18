import DS from 'ember-data';
// import { pluralize } from 'ember-inflector';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend({

	host:        'http://localhost:4500',
	namespace:   'api/v1',

	// authorizer:  'authorizer:torii'

	pathForType( type ) {
		// return pluralize( type.dasherize() );
		return type;
	}

});
