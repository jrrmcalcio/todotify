<template>
  <div class="fill-height">
    <list-tasks v-if="$store.state.tasks.length" />

    <no-tasks v-else />

    <end-sorting-button v-if="$store.state.sorting" />
  </div>
</template>

<script>
import ListTasks from '../components/todo/ListTasks.vue'
import NoTasks from '../components/todo/NoTasks.vue'
import EndSortingButton from '../components/tools/EndSortingButton.vue'

export default {
  name: 'Todo',
  components: {
    ListTasks,
    NoTasks,
    EndSortingButton,
  },
}
</script>
