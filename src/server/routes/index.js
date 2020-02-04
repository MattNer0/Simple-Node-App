import express from 'express'

import { home } from '../controllers/api-controller'

export default function() {
	const router = express.Router()
	router.get('/', home)

	return router
}
