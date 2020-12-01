<template>
  <v-text-field
    outlined
    class="pa-3"
    label="Add Task"
    hide-details
    clearable
    v-model="newTask"
    @keyup.enter="addTask"
    required
  >
    <template v-slot:append>
      <v-icon color="primary" @click="addTask" :disabled="!newTask">
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
