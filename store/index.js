import Vue from 'vue'
import Vuex from 'vuex'
import { getCookie } from '~/common/cookie'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    userMess: {}
  },
  mutations: {
    addUserMess (state, phone ) {
      Vue.$http.get(`/api/v0/user/detail?phone=${phone}`).then( res => {
        console.log(res)
      })
    }
  }
})

export default store