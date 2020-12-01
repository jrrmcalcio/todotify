<template>
  <v-dialog persistent width="290px" :value="true">
    <v-date-picker v-model="dueDate" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="save">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: 'DueDateDialog',

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dueDate: null,
    }
  },

  mounted() {
    if (!this.task.dueDate) return

    this.dueDate = this.task.dueDate
  },

  methods: {
    save() {
      this.$store.dispatch('setDueDate', {
        ...this.task,
        newDueDate: this.dueDate,
      })
      this.$emit('saved')
    },
  },
}
</script>
