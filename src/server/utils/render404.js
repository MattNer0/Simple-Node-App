
/**
 * @function render404
 * @param  {Object} req  Request object
 * @param  {Object} res  Response object
 */
export default function(req, res) {
	res.status(404)
	res.send('not found')
}
