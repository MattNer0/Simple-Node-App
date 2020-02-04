export default {
	'enabled'       : false,
	'host'          : 'redis-service.host',
	'port'          : 6379,
	'retry_strategy': ({ attempt, error }) => {
		if (error && error.code === 'ECONNREFUSED') {
			console.error('redis - The server refused the connection')
		}
		if (attempt > 10) {
			console.error('redis - Attempts limit reached')
			return null
		}

		console.error('redis - Retrying connection...')
		return Math.min(attempt * 100, 3000)
	}
}
