`import Ember from 'ember'`

PostsPostRoute = Ember.Route.extend(

	serialize: ( model ) -> slug: model.get( 'slug' )

	model: ( params ) -> @store.findRecord( 'post', params.post_id )
)

`export default PostsPostRoute`
