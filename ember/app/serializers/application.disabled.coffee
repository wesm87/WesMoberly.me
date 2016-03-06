`import DS from 'ember-data'`

serializer = DS.JSONAPISerializer.extend(
	primaryKey: '_id'
	serializeId: ( id ) -> id.toString()
)

`export default serializer`
