import Bookshelf from '../config/db.js'

import BaseModel from './common/BaseModel'

class User extends BaseModel {
	static get tableName() { return 'User' }
	get hasTimestamps() { return true }
	static get tableColumns() {
		return [
			{
				name       : 'uuid',
				type       : 'uuid',
				notNullable: true
			},
			{
				name: 'email',
				type: 'string'
			},
			{
				name: 'mobile',
				type: 'string'
			},
			{
				name       : 'password',
				type       : 'string',
				notNullable: true
			},
			{
				name     : 'access_level',
				type     : 'smallint',
				defaultTo: 0
			},
			{
				name       : 'time_zone',
				type       : 'string',
				notNullable: true
			},
			{
				name     : 'enabled',
				type     : 'boolean',
				defaultTo: true
			}
		]
	}

	static get uniqueColumns() {
		return ['uuid']
	}
	/*get tableCustomIndex() {
		return [
			'CREATE UNIQUE INDEX example_uni_idx ON favorites (user_id, menu_id, recipe_id) WHERE menu_id IS NOT NULL;',
		]
	}*/

	static get LEVEL_USER() { return 0 }
	static get LEVEL_COMPANY() { return 10 }
	static get LEVEL_ADMIN() { return 100 }

	/* Methods */

	api_object(obj) {
		return {
			user_id     : obj.id,
			uuid        : obj.uuid,
			email       : obj.email,
			mobile      : obj.mobile,
			password    : obj.password,
			access_level: obj.access_level,
			time_zone   : obj.time_zone,
			enabled     : obj.enabled
		}
	}
}

export default Bookshelf.model('User', User)
