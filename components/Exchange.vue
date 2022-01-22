<template lang="pug">
  div.exchange.exchange-wrapper
    div.exchange-item
      div.exchange-item__title Exchange EUR to BTC
      hr
      CurrencySelect(label="You Pay")
      CurrencySelect(label="You Get")
    div.exchange-item
      div.exchange-item__title Summy
      hr

</template>

<script>
import CurrencySelect from './CurrencySelect'

export default {
  name: 'Exchange',
  components: {
    CurrencySelect
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
