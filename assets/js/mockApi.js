export const mockApi = class {
  constructor () {
    this.currencies = ['USD', 'EUR', 'UAH', 'RUB', 'CAN', 'GBP', 'CHF', 'AUD', 'PNL', 'CZK']
    this.comision = [1.00, 2.00, 3.00, 4.00, 5.00]
    this.exchangeList = []
  }

  /**
   * @param {*} request
   * @return {Promise} with needed data
   */
  _simulateAsyncCall (request) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, data: { data: request } })
        // in really we can rename second "data" to needed name data
        // like ExchangeList, or ExchangeRate and take name from param, @param {String} dataName, but don't spend time for this
      }, 300)
    })
  }

  /**
   *
   * @param {Number} from
   * @param {Number} to
   * @returns {Number} needed random number
   */
  _getRandomNumber (from, to) {
    return Math.round(Math.random() * (to - from) + from);
  }

  _renderExchangeList() {
    const exchangeList = []
    this.currencies.forEach((currency, i, currencies) => {
      const filtredCurrencies = currencies.filter(fCurrency => fCurrency !== currency)
      // we can use "if" to prevent filter, but this code looks better for me
      // in this logic we get 'EUR/USD' and 'USD/EUR', maybe it's a mistake but leave this, no has info for this
      filtredCurrencies.forEach(fCurrency => {
        exchangeList.push({
          "pair": currency + '/' + fCurrency,
          "base_currency": currency,
          "quote_currency": fCurrency,
          "commissifeon": this.comision[this._getRandomNumber(0, 4)]
        })
      })
    });
    this.exchangeList = exchangeList
  }

  getExchangeList () {
    if(!this.exchangeList.length) {
      this._renderExchangeList()
    }
    return this._simulateAsyncCall(this.exchangeList)
  }

  getExchangeRates () {
    if(!this.exchangeList.length) {
      this._renderExchangeList()
    }

    const exchangeRates = this.exchangeList.map(({pair}) => ({
      pair,
      "rate": this._getRandomNumber(10, 100)
    }))
    return this._simulateAsyncCall(exchangeRates)
  }
}
