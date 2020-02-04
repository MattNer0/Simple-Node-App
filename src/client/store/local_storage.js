import VuexPersistence from 'vuex-persist'

const debug = process.env.NODE_ENV !== 'production'

export default new VuexPersistence({
	strictMode: debug,
	storage   : window.localStorage,
	modules   : ['general']
})
