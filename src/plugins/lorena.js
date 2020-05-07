import Vue from 'vue'
import Lorena from '@lorena-ssi/lorena-sdk'
import Wallet from '@lorena-ssi/wallet-lib'

import log from 'debug'
const debug = log('lorena:vue')
debug.enabled = true

const wallet = new Wallet('', { storage: 'mem', silent: false })

// Instanciate Lorena-cli
debug('Lorena init %O', wallet)
const LorenaPlugin = new Lorena(wallet, { debug: true })

Vue.use({
  install (Vue) {
    Vue.prototype.$lorena = LorenaPlugin
  }
})

export default LorenaPlugin
