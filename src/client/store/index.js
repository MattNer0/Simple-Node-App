import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from './local_storage'

import general from './modules/general'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		general
	},
	mutations: {
		RESTORE_MUTATION: LocalStorage.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
	},
	strict : debug,
	plugins: [LocalStorage.plugin]
})
