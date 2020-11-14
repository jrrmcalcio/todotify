import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'Wake up',
        done: true,
      },
      {
        id: 2,
        title: 'Get bananas',
        done: false,
      },
      {
        id: 3,
        title: 'Eat bananas',
        done: false,
      },
    ],
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push({
        id: Date.now(),
        title: newTask,
        done: false,
      })
    },
    finishTask(state, id) {
      const task = state.tasks.filter(t => t.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id)
    },
  },
  actions: {},
  modules: {},
})
