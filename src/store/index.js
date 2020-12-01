import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      {
        id: 1,
        title: 'Wake up',
        done: true,
        dueDate: '2020-10-16',
      },
      {
        id: 2,
        title: 'Get bananas',
        done: false,
        dueDate: '2020-10-17',
      },
      {
        id: 3,
        title: 'Eat bananas',
        done: false,
        dueDate: null,
      },
    ],
    snackbar: {
      show: false,
      message: '',
    },
    sorting: false,
  },
  mutations: {
    setSearch(state, search) {
      state.search = search
    },
    addTask(state, newTask) {
      state.tasks.push({
        id: Date.now(),
        title: newTask,
        done: false,
        dueDate: '',
      })
    },
    finishTask(state, id) {
      const task = state.tasks.filter(t => t.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id)
    },
    editTask(state, editedTask) {
      const task = state.tasks.filter(t => t.id === editedTask.id)[0]
      task.title = editedTask.newTitle
    },
    setDueDate(state, editedTask) {
      const task = state.tasks.filter(t => t.id === editedTask.id)[0]
      task.dueDate = editedTask.newDueDate
    },
    updateTasks(state, newTasks) {
      const missingTasks = state.tasks.filter(t => newTasks.indexOf(t) < 0)
      state.tasks = [...newTasks, ...missingTasks]
    },
    showSnackbar(state, message) {
      state.snackbar.show = true
      state.snackbar.message = message
    },
    closeSnackbar(state) {
      state.snackbar.show = false
      state.snackbar.message = ''
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    },
  },
  actions: {
    addTask({ commit }, newTask) {
      commit('addTask', newTask)
      commit('showSnackbar', 'Task ' + newTask + ' added!')
    },
    deleteTask({ commit }, task) {
      commit('deleteTask', task.id)
      commit('showSnackbar', 'Task ' + task.title + ' deleted!')
    },
    editTask({ commit }, editedTask) {
      commit('editTask', editedTask)
      commit(
        'showSnackbar',
        'Task ' + editedTask.title + ' edited to ' + editedTask.newTitle
      )
    },
    setDueDate({ commit }, editedTask) {
      commit('setDueDate', editedTask)
      commit('showSnackbar', 'Due date set for ' + editedTask.title)
    },
  },
  getters: {
    taskFiltered: state => {
      if (!state.search) return state.tasks

      return state.tasks.filter(
        t =>
          t.title.toLowerCase().includes(state.search.toLowerCase()) ||
          (t.dueDate && t.dueDate.includes(state.search))
      )
    },
  },
  modules: {},
})
