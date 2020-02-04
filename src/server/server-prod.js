'use strict'

import express from 'express'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import appConfig from './config/app-prod'
import redisConfig from './config/redis-prod'
global.__env__ = appConfig.environment.state

import * as Promise from 'bluebird'
import redis from 'redis'
import connectRedis from 'connect-redis'

import renderPage from './utils/renderPage'
import renderJson from './utils/renderJson'
import render404 from './utils/render404'
import render500 from './utils/render500'
import allowCrossDomain from './utils/allowCrossDomain'

/*
                     888 d8b
                     888 Y8P
                     888
888d888 .d88b.   .d88888 888 .d8888b
888P"  d8P  Y8b d88" 888 888 88K
888    88888888 888  888 888 "Y8888b.
888    Y8b.     Y88b 888 888      X88
888     "Y8888   "Y88888 888  88888P'
*/

Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

let currentRedisStore
if (redisConfig.enabled) {
	const RedisStore = connectRedis(expressSession)
	const redisClient = redis.createClient(redisConfig)
	currentRedisStore = new RedisStore({
		client   : redisClient,
		prefix   : 'session_',
		ttl      : 15778800,
		logErrors: true
	})

	global.__redis__ = redisClient
	global.__redisSessionStore__ = currentRedisStore

	redisClient.once('ready', function() {
		console.log('Redis connection ready')
	})

	redisClient.on('error', function(err) {
		console.error(err)
	})
}

import routes from './routes'
import migrations from './migrations'

/*
 8888b.  88888b.  88888b.
    "88b 888 "88b 888 "88b
.d888888 888  888 888  888
888  888 888 d88P 888 d88P
"Y888888 88888P"  88888P"
         888      888
         888      888
         888      888
*/

migrations()

const app = express(),
	DIST_DIR = __dirname

app.locals.__env__ = __env__
app.disable('x-powered-by')
app.enable('trust proxy')

app.use(express.static(DIST_DIR))
app.use(allowCrossDomain)

app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({
	limit   : '2mb',
	extended: false
}))
app.use(cookieParser(appConfig.cookieSecret))
app.use(expressSession({
	resave           : false,
	saveUninitialized: true,
	key              : appConfig.session.key,
	secret           : appConfig.cookieSecret,
	store            : currentRedisStore,
	cookie           : appConfig.cookieSession
}))

app.use((req, res, next) => {
	res.render = (view, options, callback) => {
		return renderPage.call(res, view, options, callback)
	}
	res.json = (data, format) => {
		return renderJson.call(res, req, data, format)
	}
	next()
})

app.use('/api', routes())

app.use((req, res) => {
	render404(req, res)
})

app.use((err, req, res) => {
	render500(req, res, err)
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`\n----------------------------------------\n` +
		`App listening on http://127.0.0.1:${PORT}` +
		`\n----------------------------------------\n`)
})
