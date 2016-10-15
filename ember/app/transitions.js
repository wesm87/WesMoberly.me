export default function liquidFireTransitions() {
	this.transition(
		this.fromRoute( 'index' ),
		this.use( 'toLeft' ),
		this.reverse( 'toRight' )
	);
}
