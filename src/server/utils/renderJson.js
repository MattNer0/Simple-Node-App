import xml from 'xml'

/**
 * @function simpleXmlFormat
 * @param  {Object} json   {description}
 * @return {Array} {description}
 */
const simpleXmlFormat = function(json) {
	const values = []
	if (json === undefined || json === null) return []
	const keys = Object.keys(json)
	for (var i=0; i < keys.length; i++) {
		var newObj = {}
		newObj[keys[i]] = parseTypeXmlFormat(keys[i], json[keys[i]])
		values.push(newObj)
	}

	return values
}

/**
 * @function parseTypeXmlFormat
 * @param  {String} key   {description}
 * @param  {Any}    value {description}
 * @return {Any} {description}
 */
const parseTypeXmlFormat = function(key, value) {
	if (value === null) {
		return null
	} else if (typeof value === 'string') {
		return { _cdata: value }
	} else if (typeof value === 'number') {
		return value
	} else if (typeof value === 'boolean') {
		return value ? 1 : 0
	} else if (value instanceof Date) {
		return value.getTime()
	} else if (typeof value === 'object') {
		if (Array.isArray(value)) {
			const mArray = []
			const itemKey = key.slice(-1) == 's' ? key.slice(0, -1) : 'item'

			for (var j=0; j < value.length; j++) {
				var item = {}
				item[itemKey] = parseTypeXmlFormat(key, value[j])
				mArray.push(item)
			}
			return mArray
		}
		return simpleXmlFormat(value)
	}

	return null
}

export default function(req, data, xmlFormat) {
	if (this.headersSent) {
		console.warn('headers already sent')
		return
	}
	if (req.accepts('json') || req.accepts('text/html')) {
		this.header('Content-Type', 'application/json')
		if (data.error_code) {
			this.status(data.error_code)
		} else if (data.thisponse && data.thisponse.code) {
			this.status(data.thisponse.code)
		}
		this.send(data)
	} else if (req.accepts('application/xml')) {
		this.header('Content-Type', 'text/xml')
		if (data.error_code) {
			this.status(data.error_code)
		} else if (data.thisponse && data.thisponse.code) {
			this.status(data.thisponse.code)
		}
		if (data.data === undefined && data.thisponse === undefined) data = { data }
		var xmlRes = xml(xmlFormat ? xmlFormat(data) : simpleXmlFormat(data), { declaration: true })
		this.send(xmlRes)
	} else {
		this.sendStatus(406)
	}

	return
}
