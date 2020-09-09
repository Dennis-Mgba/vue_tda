import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
        {
            'id': 1,
            'title': 'Finish learning vue from a tutorial',
            'completed': false,
            'editing': false
        },
            {
            'id': 2,
            'title': 'Practice out what I learned',
            'completed': false,
            'editing': false
        },
            {
            'id': 3,
            'title': 'Try out building an api of todos',
            'completed': false,
            'editing': false
        }
    ]
  },

  getters: {
    remaining(state) { 
        return state.todos.filter(todo => !todo.completed).length;
    },

    anyRemaining(state, getters) {  // since remaining is a getters property
        return getters.remaining != 0
    },

    todosFiltered(state) {
        if (state.filter == 'all') {
            return state.todos
        } else if (state.filter == 'active') {
        // active are the todos tha are not yet completed ye?
            return state.todos.filter(todo => !todo.completed)
        } else if (state.filter == 'completed') {
            return state.todos.filter(todo => todo.completed)
        }

        return state.todos 
    },

    showClearCompletedButton(state) {
        return state.todos.filter(todo => todo.completed).length > 0
    }
  },

  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
