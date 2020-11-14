<template>
  <v-text-field
    outlined
    class="pa-3"
    label="Add Task"
    append-icon="mdi-plus"
    hide-details
    clearable
    v-model="newTask"
    @click:append="addTask"
    @keyup.enter="addTask"
    required
  ></v-text-field>
</template>

<script>
export default {
  name: 'FieldAddTask',
  data: () => ({
    valid: true,
    newTask: '',
  }),
  methods: {
    addTask() {
      if (!this.newTask) return
      this.$store.commit('addTask', this.newTask)
      this.newTask = ''
    },
  },
}
</script>
