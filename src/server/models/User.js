import Bookshelf from '../config/db.js'

import ApiModel from './ApiModel'

class User extends ApiModel {
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
				name       : 'username',
				type       : 'string',
				notNullable: true
			},
			{
				name       : 'password',
				type       : 'string',
				notNullable: true
			},
			{
				name     : 'access_level',
				type     : 'integer',
				defaultTo: 0
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

	//province() { return this.belongsTo('Province', 'province_id') }

	static get LEVEL_USER() { return 0 }
	static get LEVEL_ADMIN() { return 100 }

	/* Methods */

	api_object(obj) {
		return {
			uuid: obj.uuid
		}
	}
}

export default Bookshelf.model('User', User)
