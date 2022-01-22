<template lang="pug">
  div.exchange.exchange-wrapper
    div.exchange-item
      div.exchange-item__title Exchange EUR to BTC
      hr
      CurrencySelect(
        v-model="payCurrencySymbol"
        :exchangeList="filtredCurrency(getCurrencySymbol)"
        :sum="paySum"
        @changeSum="changePaySum"
        label="You Pay"
      )
      CurrencySelect(
        v-model="getCurrencySymbol"
        :exchangeList="filtredCurrency(payCurrencySymbol)"
        :sum="getSum"
        @changeSum="changeGetSum"
        label="You Get"
      )
    div.exchange-item
      div.exchange-item__title Summy
      hr

</template>

<script>
import {mapState, mapGetters} from 'vuex'
import CurrencySelect from './CurrencySelect'


export default {
  name: 'Exchange',
  components: {
    CurrencySelect
  },
  data() {
    return {
      paySum: 0,
      getSum: 0,
      payCurrencySymbol: '',
      getCurrencySymbol: ''
    }
  },
  computed: {
    ...mapState('exchange', [
      'exchangeList',
      'exchangeRates',
      'currenciesList'
    ]),
    ...mapGetters('exchange', [
      'getRates',
      'getCommision'
    ]),
    pair() {
      return this.payCurrencySymbol + '/' + this.getCurrencySymbol
    },
    rates() {
      return this.getRates(this.pair)
    },
    commision() {
      return this.getCommision(this.pair)
    }
  },
  methods: {
    changePaySum(value) {
      this.paySum = value
      if(this.rates) {
        this.getSum = this.paySum * this.rates
      }
    },
    changeGetSum(value) {
      this.getSum = value
      if(this.rates) {
        this.paySum = this.getSum / this.rates
      }
    },
    filtredCurrency(currency) {
      return this.currenciesList.filter(fCurrency => fCurrency !== currency)
    }
  },
  created() {
    console.log('TESTexchangeList', this.exchangeList)
  }
}
</script>

<style lang="scss">
  .exchange {
    &-wrapper {
      display: flex;
      background-color: #fff;
    }
  }
</style>
