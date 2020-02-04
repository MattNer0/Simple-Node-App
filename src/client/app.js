import logMessage from './js/logger'

import Vue from 'vue'
import VueMeta from 'vue-meta'
import VuePageTransition from 'vue-page-transition'
import VueRouter from 'vue-router'

import App from './App.vue'

import router from './routes'
import store from './store'

import './theme/bulma.scss'
import './theme/style.styl'

Vue.use(VueRouter)
Vue.use(VuePageTransition)
Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
})

new Vue({
	el    : '#app',
	store,
	router,
	render: h => h(App)
})

// Log message to console
logMessage('Its finished!!')

/*
if (module.hot) // eslint-disable-line no-undef
	module.hot.accept() // eslint-disable-line no-undef
*/
