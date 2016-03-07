`import Ember from 'ember'`

NavbarNavItemComponent = Ember.Component.extend(

	tagName: ''

	route: 'index'
	icon:  undefined

	text: -> @get( 'route' ).capitalize()

)

`export default NavbarNavItemComponent`
