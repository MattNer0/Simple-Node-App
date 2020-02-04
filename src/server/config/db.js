import knex from 'knex'
import knexPostgis from 'knex-postgis'
import knexConfigurationDev from './knex-dev'
import knexConfigurationProd from './knex-prod'

const Knex = knex(process.env.NODE_ENV === 'production' ? knexConfigurationProd : knexConfigurationDev)

knexPostgis(Knex) // const st = Knex.postgis;

import bookshelf from 'bookshelf'

const Bookshelf = bookshelf(Knex)

Bookshelf.plugin('bookshelf-virtuals-plugin')

export default Bookshelf
