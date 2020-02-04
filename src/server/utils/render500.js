
/**
 * @function render500
 * @param  {Object} req  Request object
 * @param  {Object} res  Response object
 * @param  {Object} err  Error object
 */
export default function(req, res, err) {
	console.error(err)
	res.status(500)
	res.send('error')
	res.end()
}
