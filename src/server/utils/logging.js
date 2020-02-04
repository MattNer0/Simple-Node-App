import chalk from 'chalk'

/**
 * @function getErrorObject
 * @return {type} Error object
 */
function getErrorObject() {
	try {
		throw Error('')
	} catch (err) { return err }
}

/**
 * @function getLineNumber
 * @return {String} File and Line number that called the console
 */
function getLineNumber() {
	var err = getErrorObject()
	var callerLine = err.stack.split('\n')[4]
	var index = callerLine.indexOf('at ')
	var clean = callerLine.slice(index + 2, callerLine.length)
	return clean.replace(/.+\/([^/):?]+)\??:?([:\d]+)?\)?$/i, '$1:$2').trim() + ' '
}

const Logging = {

	log: (function() {
		var orig = console.log
		return function() {
			if (arguments[0]) {
				if (typeof arguments[0] === 'object') arguments[0] = '\n' + JSON.stringify(arguments[0], null, 2) + '\n'
				else if (typeof arguments[0] === 'string' && arguments[0].indexOf('\n') > 0) arguments[0] = '\n' + arguments[0]
				arguments[0] = chalk.green('[LOG]') + '   ' + getLineNumber() + ' ' + arguments[0]
			}
			orig.apply(console, arguments)
		}
	})(),

	warn: (function() {
		var orig = console.warn
		return function() {
			if (arguments[0]) {
				if (typeof arguments[0] === 'object') arguments[0] = '\n' + JSON.stringify(arguments[0], null, 2) + '\n'
				else if (typeof arguments[0] === 'string' && arguments[0].indexOf('\n') > 0) arguments[0] = '\n' + arguments[0]
				arguments[0] = chalk.yellow('[WARN]') + '  ' + getLineNumber() + ' ' + arguments[0]
			}
			orig.apply(console, arguments)
		}
	})(),

	error: (function() {
		var orig = console.error
		return function() {
			if (arguments[0]) {
				if (typeof arguments[0] === 'object') arguments[0] = '\n' + JSON.stringify(arguments[0], null, 2) + '\n'
				else if (typeof arguments[0] === 'string' && arguments[0].indexOf('\n') > 0) arguments[0] = '\n' + arguments[0]
				arguments[0] = chalk.red('[ERROR]') + ' ' + getLineNumber() + ' ' + arguments[0]
			}
			orig.apply(console, arguments)
		}
	})(),

	info: (function() {
		var orig = console.info
		return function() {
			if (arguments[0]) {
				if (typeof arguments[0] === 'object') arguments[0] = '\n' + JSON.stringify(arguments[0], null, 2) + '\n'
				else if (typeof arguments[0] === 'string' && arguments[0].indexOf('\n') > 0) arguments[0] = '\n' + arguments[0]
				arguments[0] = chalk.blue('[INFO]') + '  ' + getLineNumber() + ' ' + arguments[0]
			}
			orig.apply(console, arguments)
		}
	})()
}

export default Logging
