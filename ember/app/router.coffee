`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend(
	location: config.locationType
)

Router.map( ->

	@route 'about', ->
		@route 'test', path: '/:page_slug/:page_id'

	@route 'portfolio', ->
		@route 'new'
		@route 'item', path: '/:item_id', ->
			@route 'edit'

	@route 'posts', ->
		@route 'new'
		@route 'post', path: '/:post_id', ->
			@route 'edit'

)

`export default Router`
