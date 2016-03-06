`import Ember from 'ember'`

AuthLoginLogoutLinkComponent = Ember.Component.extend(

	session: Ember.inject.service( 'session' )

)

`export default AuthLoginLogoutLinkComponent`
