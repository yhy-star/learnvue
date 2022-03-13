import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: 0
  },
  mutations: {
    changCurrentIndex(index) {
      this.state.currentIndex = index
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getIndex(state) {
      return state.currentIndex
    }

  }
})
