<template>
  <div>
    <v-list-item
      :class="{ 'blue lighten-5': task.done }"
      @click="finishTask(task.id)"
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

        <v-list-item-action>
          <v-btn icon @click.stop="dialogs.delete = true">
            <v-icon color="primary lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>

    <delete-confirmation
      :task="task"
      v-if="dialogs.delete"
      @cancelDelete="dialogs.delete = false"
    />
  </div>
</template>

<script>
import DeleteConfirmation from './dialogs/DeleteConfirmation.vue'

export default {
  components: { DeleteConfirmation },
  name: 'Taks',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialogs: {
      delete: false,
    },
  }),
  methods: {
    finishTask(id) {
      this.$store.commit('finishTask', id)
    },
  },
}
</script>
