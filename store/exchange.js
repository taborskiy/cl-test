import {mockApi} from '@/assets/js/mockApi'
const MockApi = new mockApi()

export const state = () => ({
  exchangeList: [],
  exchangeRates: [],
})

export const mutations = {
  setExchangeList (state, list) {
    state.setExchangeList = list
  },
  setExchangeRates (state, list) {
    state.exchangeRates = list
  }
}

export const actions = {
  async fetchExchangeList ({commit}) {
    try {
      const {data: {data: list}} = await MockApi.getExchangeList()
      commit('setExchangeList', list)
    } catch (error) {
      console.error('error', { error });
      /**
       * good practice to has some global error catcher like axios inteseptions
       * or somsing like middelware
       * to prevent crash app or stop logic, stop logic can call some bugs
       * in global catcher we can show some modal with error or redirect
       */
    } finally {
      // EMPTY NOW for demonstration, we can toggle here global loading indicator, or something like loading
    }
  },
  async fetchExchangeRates ({commit}) {
    try {
      const {data: {data: list}} = await MockApi.getExchangeRates()
      commit('setExchangeRates', list)
    } catch (error) {
      console.error('error', { error });
      /**
       * good practice to has some global error catcher like axios inteseptions
       * or somsing like middelware
       * to prevent crash app or stop logic, stop logic can call some bugs
       * in global catcher we can show some modal with error or redirect
       */
    }
  }
}
