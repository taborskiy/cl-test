<template lang="pug">
  div.exchange.exchange-wrapper
    div.exchange-item
      div.exchange-item__title Exchange
        |  {{rates ? `${payCurrencySymbol} to ${getCurrencySymbol}` : ''}}
      hr.exchange-item__hr
      CurrencySelect(
        v-model="payCurrencySymbol"
        :exchangeList="filtredCurrency(getCurrencySymbol)"
        :sum="paySum"
        :key="selectKey"
        @changeSum="recalculateRate($event, 'paySum')"
        label="You Pay"
      )
      CurrencySelect(
        v-model="getCurrencySymbol"
        :exchangeList="filtredCurrency(payCurrencySymbol)"
        :sum="getSum"
        :key="selectKey + 1"
        @changeSum="recalculateRate($event, 'getSum')"
        label="You Get"
      )
    div.exchange-item.d-flex.column
      div.exchange-item__title Summy
      hr.exchange-item__hr
      div.exchange-item__info
        span.exchange-item__info-title Rate
        span.exchange-item__info-value {{rates}}
      div.exchange-item__info
        span.exchange-item__info-title Commision
        span.exchange-item__info-value {{commision ? commision : ''}}
      nuxt-link.btn(
        to="success"
        :class="{disabled: !rates || !getSum || getSum == 0}"
        :event=" rates && getSum ? 'click' : ''"
      ) EXCHANGE

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
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
      selectKey: 0,
      payCurrencySymbol: '',
      getCurrencySymbol: '',
      fetchRatesInterval: null,
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
      return +this.getCommision(this.pair)
    },
  },
  watch: {
    pair() {
      this.recalculateRate(this.paySum, 'paySum')
    },
    rates() {
      this.recalculateRate(this.paySum, 'paySum')
    }
  },
  methods: {
    ...mapActions('exchange', [
      'fetchExchangeRates'
    ]),
    recalculateRate(value, propName) {
      if(this.rates && /^\d*\.?\d*$/.test(value)) {
        this[propName] = value;
        if(propName === 'getSum') {
          this.paySum = ((value/(100 - this.commision))*100 / this.rates).toFixed(2)
        } else {
          this.getSum = (value * this.rates - value * this.rates/100*this.commision).toFixed(2)
        }
      } else {
        this.paySum = 0;
        this.getSum = 0;
        ++this.selectKey
      }
    },
    filtredCurrency(currency) {
      return this.currenciesList.filter(fCurrency => fCurrency !== currency)
    }
  },
  created() {
    this.fetchRatesInterval = setInterval(() => {
      this.fetchExchangeRates()
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.fetchRatesInterval) // to prevent memory leak
  }
}
</script>

<style lang="scss">
  .exchange {
    &-wrapper {
      display: flex;
      background-color: #eee;
      padding: 20px;
      border-radius: 6px;
    }
    &-item {
      padding: 20px;
      background-color: #fff;
      width: 320px;

      &:first-child {
        margin-right: 10px;
        border-radius: 3px;
      }

      &__title {
        font-size: 24px;
        font-weight: 500;
      }

      &__hr {
        height: 0;
        border: none;
        border-top: 1px solid #eee;
      }

      &__info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 6px 0;

        &:nth-child(3) {
          margin-top: 20px !important;
        }

        &-title {
          font-size: 14px;
          font-weight: 500;
        }

        &-value {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }

  .btn {
    height: 40px;
    width: 100%;
    margin-top: auto;
    background-color: #4284e3cc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;

    &.disabled {
      background-color: #6e6e6e70;
    }
  }

  .d-flex {
    display: flex;
  }

  .column {
    flex-direction: column;
  }
</style>
