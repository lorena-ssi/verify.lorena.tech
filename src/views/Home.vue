<template>
  <v-container>
        <h1>Verification</h1>
        <Verify />

  </v-container>
</template>

<script>
// @ is an alias to /src
import Verify from '@/components/Verify.vue'

export default {
  name: 'Home',
  components: {
    Verify
  }
}
</script>
