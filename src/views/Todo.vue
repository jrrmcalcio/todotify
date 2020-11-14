<template>
  <div class="todo fill-height">
    <v-text-field
      class="pa-3"
      outlined
      label="Add Task"
      append-icon="mdi-plus"
      hide-details
      clearable
      v-model="newTask"
      @click:append="addTask"
      @keyup.enter="addTask"
      required
      :rules="rules.title"
    ></v-text-field>
    <v-list flat class="pt-0" v-if="tasks.length">
      <div v-for="task in tasks" :key="task.id">
        <v-list-item :class="{ 'blue lighten-5': task.done }">
          <template>
            <v-list-item-action>
              <v-checkbox v-model="task.done" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': task.done }"
                >{{ task.title }}</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="deleteTask(task.id)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <div v-else class="no-tasks">
      <v-icon size="100" left color="primary">mdi-check</v-icon>
      <div class="text-h5 primary--text">No Tasks</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Todo',
  components: {},
  data: () => ({
    rules: {
      title: [v => (v || '').length > 0 || 'Task title is required'],
    },
    newTask: '',
    tasks: [],
  }),
  methods: {
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    addTask() {
      this.tasks.push({
        id: Date.now(),
        title: this.newTask,
        done: false,
      })
      this.newTask = ''
    },
  },
}
</script>
<style lang="css">
.no-tasks {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
