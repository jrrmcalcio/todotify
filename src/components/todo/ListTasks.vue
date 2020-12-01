<template>
  <v-list flat class="pt-0">
    <draggable v-model="tasks" handle=".drag-handle">
      <task v-for="task in tasks" :key="task.id" :task="task" />
    </draggable>
  </v-list>
</template>

<script>
import Task from './Task.vue'
import draggable from 'vuedraggable'

export default {
  name: 'ListTask',

  components: { Task, draggable },

  computed: {
    tasks: {
      get() {
        return this.$store.getters.taskFiltered
      },
      set(value) {
        this.$store.commit('updateTasks', value)
      },
    },
  },
}
</script>
