<template>
  <div>
    <h2>Symmetric</h2>
    <v-row>
      <v-col>
        <v-textarea
          outlined
          label="Insert a message to encrypt"
          placeholder="Place the messahe here"
          v-model="message"
          class="mt-5"
        ></v-textarea>
        <v-text-field outlined name="password" label="password" v-model="password"></v-text-field>
        <v-text-field outlined name="header" label="header" v-model="header"></v-text-field>
      </v-col>
      <v-col>
        <v-textarea outlined label="Secret message" v-model="ciphertext" class="mt-5" :rows="11"></v-textarea>
      </v-col>
      <v-btn block @click="handleEncrypt" color="success">Encrypt</v-btn>
    </v-row>

    <v-row>
      <v-col>
        <v-textarea
          outlined
          label="Insert a message to decrypt"
          placeholder="Place secret message"
          v-model="secretMessage"
          class="mt-5"
          :rows="11"
        ></v-textarea>
        <v-text-field outlined name="password" label="password" v-model="decryptpassword"></v-text-field>

      </v-col>
      <v-col>
        <v-textarea outlined label="Decrypted" v-model="decrypted" class="mt-5" :rows="14"></v-textarea>
      </v-col>
    </v-row>
    <v-btn block @click="handleDecrypt" color="success">Decrypt</v-btn>
  </div>
</template>

<script>
export default {
  created () {
    // this.handleEncrypt()
    // this.handleDecrypt()
  },
  data: function () {
    return {
      message: 'Hello world',
      ciphertext: null,
      encryptionsuccess: null,
      decryptionsuccess: null,
      password: '123',
      decryptpassword: null,
      header: 'header',
      secretMessage: null,
      decrypted: null
    }
  },
  methods: {
    async handleEncrypt () {
      this.$store.commit('SET_LOADING', true)
      try {
        const result = await this.encrypt(
          this.password,
          this.message,
          this.header
        )
        this.encryptionsuccess = true
        if (!result) this.encryptionsuccess = false
        this.ciphertext = JSON.stringify(result, null, 2)
      } catch (_) {
        this.encryptionsuccess = false
      }
      this.$store.commit('SET_LOADING', false)
    },
    async encrypt (password, message, header) {
      return await this.$lorena.zenroom.encryptSymmetric(
        password,
        message,
        header
      )
    },
    async handleDecrypt () {
      this.$store.commit('SET_LOADING', true)
      try {
        const result = await this.decrypt(this.decryptpassword, this.secretMessage)
        this.decryptionsuccess = true
        if (!result) this.decryptionsuccess = false
        this.decrypted = JSON.stringify(result, null, 2)
      } catch (_) {
        this.decryptionsuccess = false
      }
      this.$store.commit('SET_LOADING', false)
    },
    async decrypt (password, secretMessage) {
      return await this.$lorena.zenroom.decryptSymmetric(
        password,
        secretMessage
      )
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
    }
  }
}
</script>

<style>
</style>
