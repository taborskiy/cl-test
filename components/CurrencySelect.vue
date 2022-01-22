<template lang="pug">
  div.currency-select
    label.currency-select__label(for="") {{label}}
    BaseInput(
      v-model="sumInput"
    )
    Multiselect(
      v-model="selectModel"
      :options="exchangeList"
    )
</template>

<script>
import BaseInput from './BaseInput'
import Multiselect from 'vue-multiselect'

export default {
  name: "CurrencySelect",
  components: {
    BaseInput,
    Multiselect
  },
  props: {
    label: {
      type: String,
      require: true
    },
    exchangeList: {
      type: Array,
      require: true,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    sum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    selectModel: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    sumInput: {
      get() {
        return this.sum
      },
      set(value) {
        this.$emit('changeSum', value)
      }
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
