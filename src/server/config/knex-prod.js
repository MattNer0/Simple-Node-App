export default {
	'client'    : 'pg',
	'connection': {
		'host'    : 'database-service.host',
		'user'    : 'user',
		'password': 'password',
		'database': 'database',
		'charset' : 'utf8'
	},
	'pool': {
		'min': 2,
		'max': 10
	},
	'migrations'              : { 'tableName': 'knex_migrations' },
	'acquireConnectionTimeout': 30000 //ms
}
