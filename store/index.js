export const actions = {
  async nuxtServerInit ({dispatch}, {}) {
    try {
      await Promise.all([
        dispatch('exchange/fetchExchangeList'),
        dispatch('exchange/fetchExchangeRates'),
        dispatch('exchange/fetchCurrenciesList')
      ]);
    } catch (error) {
      console.error('error', { error });
    }
  }
}
