<template>
  <v-snackbar :value="$store.state.snackbar.show" @input="close">
    {{ $store.state.snackbar.message }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="close">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'Snackbar',
  methods: {
    close() {
      this.$store.commit('closeSnackbar')
    },
  },
}
</script>
