<template>
  <div class="todo fill-height">
    <field-add-task />

    <list-tasks v-if="$store.state.tasks.length" />

    <no-tasks v-else />
  </div>
</template>

<script>
import FieldAddTask from '@/components/todo/FieldAddTask'
import ListTasks from '../components/todo/ListTasks.vue'
import NoTasks from '../components/todo/NoTasks.vue'

export default {
  name: 'Todo',
  components: {
    FieldAddTask,
    ListTasks,
    NoTasks,
  },
}
</script>
