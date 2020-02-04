export default function(view, options, callback) {
	let locals = Object.assign({}, this.locals)
	this.send(view(Object.assign(locals, options)))
	if (typeof callback === 'function') callback()
}
