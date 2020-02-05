import Bookshelf from '../config/db.js'
import uuidv1 from 'uuid/v1'

class BaseModel extends Bookshelf.Model{
	static get tableName() { throw new Error('no table name defined') }
	get tableName() { return this.constructor.tableName }

	static get tableColumns() {
		return []
	}
	static get uniqueColumns() {
		return []
	}

	/*
	                  d8b
	                  Y8P

	 8888b.  88888b.  888
	    "88b 888 "88b 888
	.d888888 888  888 888
	888  888 888 d88P 888
	"Y888888 88888P"  888
	         888
	         888
	         888
	                       888    888                    888
	                       888    888                    888
	                       888    888                    888
	88888b.d88b.   .d88b.  888888 88888b.   .d88b.   .d88888 .d8888b
	888 "888 "88b d8P  Y8b 888    888 "88b d88""88b d88" 888 88K
	888  888  888 88888888 888    888  888 888  888 888  888 "Y8888b.
	888  888  888 Y8b.     Y88b.  888  888 Y88..88P Y88b 888      X88
	888  888  888  "Y8888   "Y888 888  888  "Y88P"   "Y88888  88888P'

	*/

	/**
	 * @function serializeCollection
	 * @param  {Bookshelf.Collection} models {description}
	 * @return {Array} Serialized json array
	 */
	static serializeCollection(models) {
		const numModels = models.length
		var results = []
		for (let i=0; i<numModels; i++) {
			results.push(models.at(i).serializeModel())
		}

		return results
	}
	static api_schema() {
		let obj_map = {}
		this.tableColumns.forEach((column) => {
			obj_map[column.name] = {
				'type': column.type
			}
		})
		return this.api_object(obj_map)
	}

	api_object(attributes) {
		return Object.assign({}, attributes)
	}

	serializeModel() {
		let objAttributes = this.api_object(this.attributes)

		for (const [key, value] of Object.entries(this.relations)) {
			objAttributes[key] = value.length ? this.constructor.serializeCollection(value) : value.serializeModel()
		}

		return objAttributes
	}

	static generateUUID() {
		return uuidv1()
	}

	/*
	 .d888 d8b               888
	d88P"  Y8P               888
	888                      888
	888888 888 88888b.   .d88888
	888    888 888 "88b d88" 888
	888    888 888  888 888  888
	888    888 888  888 Y88b 888
	888    888 888  888  "Y88888


	                       888    888                    888
	                       888    888                    888
	                       888    888                    888
	88888b.d88b.   .d88b.  888888 88888b.   .d88b.   .d88888 .d8888b
	888 "888 "88b d8P  Y8b 888    888 "88b d88""88b d88" 888 88K
	888  888  888 88888888 888    888  888 888  888 888  888 "Y8888b.
	888  888  888 Y8b.     Y88b.  888  888 Y88..88P Y88b 888      X88
	888  888  888  "Y8888   "Y888 888  888  "Y88P"   "Y88888  88888P'

	*/

	/**
	 * @function findById
	 * @param  {Number} id      Value for the ID index column
	 * @param  {Object} options Bookshelf.js fetch options
	 * @return {Promise} Promise chain
	 */
	static async findById(id, options) {
		if (options === undefined) options = { require: true }
		return this.where('id', id).fetch(options)
	}

	/**
	 * @function findByUUID
	 * @param  {String} uuid    Value for the UUID index column
	 * @param  {Object} options Bookshelf.js fetch options
	 * @return {Promise} Promise chain
	 */
	static async findByUUID(uuid, options) {
		if (options === undefined) options = { require: true }
		return this.where('uuid', uuid).fetch(options)
	}

	/**
	 * @function findOneBy
	 * @description Find first matching row from the database
	 * @param  {String} column_name    Column name
	 * @param  {String} value          Value to search in column
	 * @param  {Object} options        Bookshelf.js fetch options
	 * @return {Promise} Promise chain
	 */
	static async findOneBy(column_name, value, options) {
		if (options === undefined) options = { require: true }
		return this.where(column_name, value).fetch(options)
	}

	/**
	 * @function findAllBy
	 * @description Find all matching rows from the database
	 * @param  {String} column_name    Column name
	 * @param  {String} value          Value to search in column
	 * @param  {Object} options        Bookshelf.js fetch options
	 * @return {Promise} Promise chain
	 */
	static async findAllBy(column_name, value, options) {
		if (options === undefined) options = { require: false }
		return this.where(column_name, value).fetchAll(options)
	}

	/**
	 * @function findPaginated
	 * @param  {Object} condition     Query condition
	 * @param  {Object} order         Order by
	 * @param  {Number} pageNumber    Number of the page to retrieve
	 * @param  {Number} perPage       Number of rows per page
	 * @param  {Object} queryOptions  Bookshelf.js fetch options
	 * @param  {Array}  selectColumns Columns to select
	 * @return {Promise} Promise chain
	 */
	static async findPaginated(condition, order, pageNumber, perPage, queryOptions, selectColumns) {
		if (perPage === undefined) perPage = 10
		if (selectColumns === undefined) selectColumns = []
		if (queryOptions === undefined) queryOptions = { require: false }
		var pageOffset = ( pageNumber - 1 ) * perPage

		let itemCount = await this.where(condition).count('id')

		if (itemCount > 0 && itemCount > pageOffset) {
			let items = await this.query(function(qb) {
				qb
					.where(condition)
					.limit(perPage)
					.offset(pageOffset)

				if (typeof order === 'string') {
					qb.orderBy(order, 'asc')

				} else if (typeof order === 'object') {
					qb.orderBy(order.column, order.direction)
				}

				if (selectColumns.length > 0) {
					qb.select.apply(this, selectColumns)
				}

			}).fetchAll(queryOptions)

			return {
				docs       : items.toJSON(),
				itemCount  : itemCount,
				pageCurrent: pageNumber,
				pageCount  : Math.ceil(itemCount / perPage)
			}
		}

		return {
			docs       : [],
			itemCount  : itemCount,
			pageCurrent: pageNumber,
			pageCount  : itemCount > 0 ? Math.ceil(itemCount / perPage) : 0
		}
	}

	/*
	                                  888
	                                  888
	                                  888
	 .d8888b 888d888 .d88b.   8888b.  888888 .d88b.
	d88P"    888P"  d8P  Y8b     "88b 888   d8P  Y8b
	888      888    88888888 .d888888 888   88888888
	Y88b.    888    Y8b.     888  888 Y88b. Y8b.
	 "Y8888P 888     "Y8888  "Y888888  "Y888 "Y8888


	                       888    888                    888
	                       888    888                    888
	                       888    888                    888
	88888b.d88b.   .d88b.  888888 88888b.   .d88b.   .d88888 .d8888b
	888 "888 "88b d8P  Y8b 888    888 "88b d88""88b d88" 888 88K
	888  888  888 88888888 888    888  888 888  888 888  888 "Y8888b.
	888  888  888 Y8b.     Y88b.  888  888 Y88..88P Y88b 888      X88
	888  888  888  "Y8888   "Y888 888  888  "Y88P"   "Y88888  88888P'

	*/

	static async create(data, options) {
		if (this.tableColumns.findIndex(obj => obj.name === 'uuid') >= 0 && data.uuid === undefined) {
			data.uuid = this.generateUUID()
		}

		return this.forge(data).save(null, options)
	}

	static async createIfNew(query, data, options) {
		if (data === undefined) data = {}
		let exists = await this.where(query).count('id')
		if (exists > 0) return false

		if (query.id) delete query.id
		return this.create(Object.assign(query, data), options)
	}
}

export default BaseModel
