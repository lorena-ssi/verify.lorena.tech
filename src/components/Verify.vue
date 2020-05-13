<template>
  <div>
    <v-textarea
      outlined
      label="Insert your credential here (Json)"
      placeholder="Place the JSON of your credential here"
      v-model="json"
      class="mt-5"
      :rows="11"
    ></v-textarea>
    <v-row>

      <v-spacer></v-spacer>
      <v-btn @click="handleValidation" color="success">Validate</v-btn>
    </v-row>
    <v-card v-if="success" class="mt-5">
      <v-card-title primary-title><v-chip :color="this.success ? 'green' : 'red'" text-color="white">{{verified}}</v-chip></v-card-title>
      <v-card-text>
        <v-treeview v-model="tree" :open="[]" :items="credentialTree" item-key="name" open-on-click>
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.icon">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
            <v-icon v-else>{{ item.icon }}</v-icon>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
    <v-card v-if="success === false" class="mt-5">
      <v-card-title primary-title><v-chip :color="this.success ? 'green' : 'red'" text-color="white">{{verified}}</v-chip></v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  created () {
  },
  data: function () {
    return {

      // {"@context":["https://www.w3.org/2018/credentials/v1"],"type":["VerifiableCredential","Achievement"],"issuer":"did:lor:labtest:ZGtaUFRIaHlOQzEzUmpoSVlrdzJZbTkz","issuanceDate":"2020-04-30T04:17:18.037Z","credentialSubject":{"@type":"Achievement","id":"did:lor:labtest:bafyreiegi4p5fg65chx67gkppk2zcded7smfe6lgestf44wcqyiuxicriu;id:22","course":{"id":"did:lor:labtest:bafyreiegi4p5fg65chx67gkppk2zcded7smfe6lgestf44wcqyiuxicriu"},"agent":{"@type":"Person","id":"","name":"Alex Puig","email":"alex@caelumlabs.com"},"expirationDate":""},"proof":{"type":"Curve448-Goldilocks","proofPurpose":"assertionMethod","verificationMethod":"","signature":{"did:lor:labtest:ZGtaUFRIaHlOQzEzUmpoSVlrdzJZbTkz":{"draft":"dW5kZWZpbmVk","signature":{"r":"K1zKNIkSx87nZ7bj_JlrN8z2qgkvPUsHe25E3yZ1UU16ufH4H31MS52_leNlBoCdLmM4vUvCAaA","s":"Pcb-VF08gc7IymfxXWCgBwwPfcyMYLL-7pLrjwKuQF4p5gpfvQSCrOKk0QjolRSY3v6Wwtqwc4E"}}}}}
      json: '',
      success: null,
      certificate: {},
      credential: {},
      tree: []
    }
  },
  methods: {
    async handleValidation () {
      this.$store.commit('SET_LOADING', true)
      const result = await this.validate(this.json) // json
      this.$store.commit('SET_LOADING', false)
      this.success = result.success || false
      if (result.success) {
        this.certificate = result.verified.certificate
        this.credential = result.verified.credential
      }
    },
    async validate (json) {
      return await this.$lorena.verifyCredential(json)
    },
    createTree (obj, currIndex = 1) {
      const reduced = Object.keys(obj).reduce((prev, curr, index) => {
        prev[index] = {}
        prev[index].id = currIndex
        currIndex++
        if (typeof obj[curr] === 'object' && obj[curr] !== null) {
          prev[index].name = curr
          prev[index].children = this.createTree(obj[curr], currIndex)
        } else {
          prev[index].name = `${curr}: ${obj[curr]}`
          prev[index].icon = 'mdi-card-text'
          // prev[index].children = [{ id: currIndex, name: obj[curr] }]
          currIndex++
        }

        return prev
      }, [])

      return reduced
    }
  },
  computed: {
    verified: function () {
      if (this.success) {
        return 'Valid'
      }
      if (this.success === false) {
        return 'Invalid'
      }
      return '' // null
    },
    credentialTree: function () {
      const obj = this.credential?.credentialSubject ?? {}
      return this.createTree(obj)
    }
  }
}
</script>

<style>
</style>
