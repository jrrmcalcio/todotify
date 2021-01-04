import Vue from 'vue'
import Vuex from 'vuex'

import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [],
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
      state.tasks.push(newTask)
    },
    finishTask(state, task) {
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
      state.tasks = newTasks
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
      const task = {
        id: Date.now(),
        title: newTask,
        done: false,
        dueDate: '',
      }
      db.collection('tasks')
        .add(task)
        .then(() => {
          commit('addTask', task)
          commit('showSnackbar', 'Task ' + task.title + ' added!')
        })
    },
    finishTask({ commit }, task) {
      db.collection('tasks')
        .doc({ id: task.id })
        .update({ done: !task.done })
        .then(() => {
          commit('finishTask', task)
        })
    },
    deleteTask({ commit }, task) {
      db.collection('tasks')
        .doc({ id: task.id })
        .delete()
        .then(() => {
          commit('deleteTask', task.id)
          commit('showSnackbar', 'Task ' + task.title + ' deleted!')
        })
    },
    editTask({ commit }, editedTask) {
      db.collection('tasks')
        .doc({ id: editedTask.id })
        .update({ title: editedTask.newTitle })
        .then(() => {
          commit('editTask', editedTask)
          commit(
            'showSnackbar',
            'Task ' + editedTask.title + ' edited to ' + editedTask.newTitle
          )
        })
    },
    setDueDate({ commit }, editedTask) {
      db.collection('tasks')
        .doc({ id: editedTask.id })
        .update({ dueDate: editedTask.newDueDate })
        .then(() => {
          commit('setDueDate', editedTask)
          commit('showSnackbar', 'Due date set for ' + editedTask.title)
        })
    },
    updateTasks({ state, commit }, newTasks) {
      const missingTasks = state.tasks.filter(t => newTasks.indexOf(t) < 0)
      const newOrderedTasks = [...newTasks, ...missingTasks]

      db.collection('tasks').set(newTasks)
      commit('updateTasks', newOrderedTasks)
    },
    getTasks({ commit }) {
      db.collection('tasks')
        .get()
        .then(tasks => {
          commit('updateTasks', tasks)
        })
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
