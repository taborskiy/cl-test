import {mockApi} from '@/assets/js/mockApi'
const MockApi = new mockApi()

export const state = () => ({
  exchangeList: [],
  exchangeRates: [],
  currenciesList: []
})

export const getters = {
  getRates: state => pair => state.exchangeRates.find(rates => rates.pair == pair)?.rate, // es2021 syntactics
  getCommision: state => pair => state.exchangeList.find(rates => rates.pair == pair)?.commissifeon
}

export const mutations = {
  setExchangeList (state, list) {
    state.exchangeList = list
  },
  setExchangeRates (state, list) {
    state.exchangeRates = list
  },
  setCurrenciesList (state, list) {
    state.currenciesList = list
  },
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
    }
  },
  async fetchCurrenciesList ({commit}) {
    try {
      const {data: {data: list}} = await MockApi.getCurrenciesList()
      commit('setCurrenciesList', list)
    } catch (error) {
      console.error('error', { error });
    }
  }
}
