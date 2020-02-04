const { series } = require('gulp')
var browserSync = require('browser-sync')
var nodemon = require('gulp-nodemon')

function taskBrowser(cb) {
	browserSync.init(null, {
		files          : ['./dist/server.js'],
		logLevel       : "info",
		proxy          : "localhost:8080",   // local node app address
		port           : 5000,               // use *different* port than above
		notify         : false,
		reloadOnRestart: true,
		reloadDelay    : 3000,
		reloadDebounce : 2000
	})
	cb()
}

function taskNodemon(cb) {
	var started = false
	return nodemon({
		watch : './dist',
		script: './dist/server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb()
			started = true
		}
	})
}

module.exports = series(taskBrowser, taskNodemon)
