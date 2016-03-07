transitions = ->
	@transition(
		@fromRoute 'index'
		@use 'toLeft'
		@reverse 'toRight'
	)

`export default transitions`
