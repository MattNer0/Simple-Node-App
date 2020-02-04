'use strict'

var gulp = require('gulp')
var syncTask = require('./src/tasks/sync')

gulp.task('default', syncTask)
