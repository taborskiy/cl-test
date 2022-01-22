<template lang="pug">
  div.currency-select
    label.currency-select__label(for="") {{label}}
    BaseInput
</template>

<script>
import BaseInput from './BaseInput'
export default {
  name: "CurrencySelect",
  components: {
    BaseInput
  },
  props: {
    label: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="scss">
  .currency-select {
    display: flex;
    flex-wrap: wrap;

    &__label {
      width: 100%;
    }
  }
</style>
