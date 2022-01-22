export const actions = {
  async nuxtServerInit ({dispatch}, {}) {
    try {
      await Promise.all([
        dispatch('exchange/fetchExchangeList'),
        dispatch('exchange/fetchExchangeRates')
      ]);
    } catch (error) {
      console.error('error', { error });
    }
  }
}
