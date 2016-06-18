
describe 'app / index', ->
	it 'should set `global.__serverPort`'
	it 'should set `global.__serverPath`'
	it 'should set `global.__emberPath`'
	it 'should create a new Express instance'
	it 'should create a new DB connection'
	it 'should load the REST API middleware'
	it 'should load the REST API router'
	it 'should load the Ember router'
	it 'should return an Express instance when included via `require()`'
	it 'should not start Express when included via `require()`'
	it 'should not run Express as root user'
	it 'should shut down server on SIGTERM'
