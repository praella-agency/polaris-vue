'use strict'
const pack = require('../package.json')

const bannerTxt = `/*! PolarisVue v${pack.version} | MIT License | github.com/hulkapps/polaris-vue */\n`

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)