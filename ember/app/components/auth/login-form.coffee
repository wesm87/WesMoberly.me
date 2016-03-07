`import Ember from 'ember'`

AuthLoginFormComponent = Ember.Component.extend(

	session: Ember.inject.service()

	actions:
		authenticateWithFacebook: ->
			@get( 'session' ).authenticate( 'authenticator:torii', 'facebook' )

)

`export default AuthLoginFormComponent`
