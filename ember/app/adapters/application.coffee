`import DS from 'ember-data'`
`import { pluralize } from 'ember-inflector'`
`import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'`

ApplicationAdapter = DS.JSONAPIAdapter.extend( # DataAdapterMixin,

	host:        'http://localhost:4500'
	namespace:   'api/v1'
	# authorizer:  'authorizer:torii'

	# pathForType: ( type ) -> pluralize( type.dasherize() )

)

`export default ApplicationAdapter`
