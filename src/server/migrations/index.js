/* eslint-disable no-unused-vars */
'use strict'

import knex from 'knex'
import knexConfigurationDev from '../config/knex-dev'
import knexConfigurationProd from '../config/knex-prod'

const Knex = knex(process.env.NODE_ENV === 'production' ? knexConfigurationProd : knexConfigurationDev)

import User from '../models/User'

/**
 * @function createTable
 * @param  {Bookshelf.Model} model Database model
 * @return {Promise} Promise chain
 */
// eslint-disable-next-line no-unused-vars
async function createTable(model) {
	let exist = await Knex.schema.hasTable(model.tableName)
	if (exist) {
		console.log('Table "' + model.tableName + '" already exists.')
		return null
	}

	console.log('Create table "' + model.tableName + '".')
	return Knex.schema.createTable(model.tableName, function(table) {
		table.increments().primary()

		model.tableColumns.forEach(column => {
			if (column.references) {
				table.specificType(column.name, column.type).references(column.references).onDelete(column.onDelete ? column.onDelete : 'SET NULL')
			} else if (column.type === 'decimal' && column.precision && column.scale) {
				table.decimal(column.name, column.precision, column.scale)
			} else if (column.type === 'string' && column.length) {
				if (column.notNullable) {
					table.string(column.name, column.length).notNullable()
				} else {
					table.string(column.name, column.length)
				}
			} else if (column.type === 'json' || column.type === 'jsonb') {
				if (column.notNullable) {
					table.jsonb(column.name).notNullable()
				} else {
					table.jsonb(column.name)
				}
			} else if (column.defaultTo) {
				table.specificType(column.name, column.type).defaultTo(column.defaultTo).notNullable()
			} else if (column.notNullable) {
				table.specificType(column.name, column.type).notNullable()
			} else {
				table.specificType(column.name, column.type)
			}
		})

		if (model.uniqueColumns && model.uniqueColumns.length > 0) {
			model.uniqueColumns.forEach(columns => {
				table.unique(columns)
			})
		}

		table.timestamps()
	}).catch(function(err) {
		console.error(err)
	})
}

/**
 * @function deleteTable
 * @param  {Bookshelf.Model} model Database model
 * @return {Promise} Promise chain
 */
// eslint-disable-next-line no-unused-vars
function deleteTable(model) {
	return Knex.schema.dropTableIfExists(model.tableName)
}

export default function() {
	//createTable(User)
}
