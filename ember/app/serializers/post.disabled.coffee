`import DS from 'ember-data'`

serializer = DS.JSONAPISerializer.extend(
	primaryKey: 'postID'
	serializeId: ( id ) -> id.toString()
)

`export default serializer`
