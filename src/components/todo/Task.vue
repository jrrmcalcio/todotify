<template>
  <div>
    <v-list-item
      :class="{ 'blue lighten-5': task.done }"
      @click="$store.dispatch('finishTask', task)"
      class="white"
      :ripple="false"
    >
      <template>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
            >{{ task.title }}</v-list-item-title
          >
        </v-list-item-content>

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ task.dueDate | dueDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action v-if="!$store.state.sorting">
          <task-menu :task="task"></task-menu>
        </v-list-item-action>

        <v-list-item-action v-if="$store.state.sorting">
          <v-btn color="primary" icon class="drag-handle">
            <v-icon>mdi-drag-vertical</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { format } from 'date-fns'
import TaskMenu from './TaskMenu.vue'

export default {
  components: { TaskMenu },

  name: 'Taks',

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  filters: {
    dueDate: value => {
      const date = new Date(value + 'T00:00:00Z') // UTC
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset()) // Local time zone
      return format(date, 'MMM d')
    },
  },
}
</script>

<style lang="sass">
.sortable-ghost
  opacity: 0
.sortable-chosen
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
</style>
