<template>
  <v-text-field
    outlined
    class="field-add-task pa-3"
    placeholder="Add Task"
    hide-details
    clearable
    v-model="newTask"
    @keyup.enter="addTask"
    required
  >
    <template v-slot:append>
      <v-icon @click="addTask" :disabled="!newTask">
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'FieldAddTask',
  data: () => ({
    newTask: '',
  }),
  methods: {
    addTask() {
      if (!this.newTask) return
      this.$store.dispatch('addTask', this.newTask)
      this.newTask = ''
    },
  },
}
</script>

<style lang="sass">
.field-add-task.v-input--is-focused
  .v-input__slot
    background: rgba(31,94,129, 0.5)
</style>
