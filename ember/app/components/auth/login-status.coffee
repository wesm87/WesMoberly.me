`import Ember from 'ember'`

AuthLoginStatusComponent = Ember.Component.extend(

	tagName: 'span'

	classNames: [
		'nav-item'
		'nav-link'
	]

	session: Ember.inject.service()

	icon: ->
		return 'check-circle' if @get( 'session' ).isAuthenticated
		return 'minus-circle'

)

`export default AuthLoginStatusComponent`
