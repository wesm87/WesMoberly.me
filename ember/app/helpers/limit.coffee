`import Ember from 'ember'`

# This function receives the params `params, hash`
limit = ( params, hash ) ->
	[ array, limit ] = params
	return array.slice 0, limit

LimitHelper = Ember.Helper.helper limit

`export { limit }`

`export default LimitHelper`
