<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Delete Task?
      </v-card-title>
      <v-card-text>
        Are you sure you want to delete &quot;{{ task.title }}&quot; task?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('cancel')">
          Cancel
        </v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="$store.dispatch('deleteTask', task)"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteConfirmation',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
}
</script>
