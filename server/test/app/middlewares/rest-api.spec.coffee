
describe 'app / middlewares / rest-api', ->
	it 'should send the corrent Content-Type header'
	it 'should send a 500 code on internal server error'
	it 'should send a 404 code when URL is invalid'
	it 'should send a 404 code when DB query returns null / false'
	it 'should send JSON content when DB query returns results'
