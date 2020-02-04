import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'

const router = new VueRouter({
	routes: [
		{
			path     : '/',
			component: Home
		},
		{
			path     : '/login',
			component: Login
		},
		{
			path     : '/about',
			component: About
		}
	]
})

export default router
