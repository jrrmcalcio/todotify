<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Edit Task
      </v-card-title>
      <v-card-text>
        Edit this task title:
        <v-text-field
          name="title"
          label="Title"
          id="title"
          v-model="title"
          @keyup.enter="edit"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('cancel')">
          Cancel
        </v-btn>
        <v-btn color="red darken-1" text @click="edit" :disabled="!valid">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditDialog',

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      title: '',
    }
  },

  computed: {
    valid() {
      return this.title !== this.task.title && this.title
    },
  },

  mounted() {
    this.title = this.task.title
  },

  methods: {
    edit() {
      if (!this.valid) return
      this.$store.dispatch('editTask', { ...this.task, newTitle: this.title })
      this.$emit('edited')
    },
  },
}
</script>
