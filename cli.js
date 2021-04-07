#!/usr/bin/env node
'use strict'

const mri = require('mri')
const pkg = require('./package.json')
const {fetchMetrics, printReadable} = require(".")

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v',
    'json', 'j'
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
  vodafone-metrics [options]
    View speed and connection metrics of the vodafone gateway you're behind
Options:
  --json
    Get metrics in json format
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`v${pkg.version}\n`)
	process.exit(0)
}

(async () => {
  const metrics = await fetchMetrics()

  if (argv.json || argv.j)
    console.log(metrics)
  else 
    printReadable(metrics)
})()