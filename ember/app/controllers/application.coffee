`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend(

	actions:
		invalidateSession: ->
			this.get( 'session' ).invalidate()

)

`export default ApplicationController`
