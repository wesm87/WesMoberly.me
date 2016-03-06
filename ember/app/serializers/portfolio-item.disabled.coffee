`import DS from 'ember-data'`

serializer = DS.JSONAPISerializer.extend(
	primaryKey: 'itemID'
	serializeId: ( id ) -> id.toString()
)

`export default serializer`
