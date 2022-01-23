<template lang="pug">
  div.currency-select
    label.currency-select__label(for="") {{label}}
    BaseInput(
      v-model="sumInput"
    )
    Multiselect(
      v-model="selectModel"
      :options="exchangeList"
      placeholder="UAH"
      :show-labels="false"
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
      type: [Number, String],
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
    padding-top: 20px;

    &__label {
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      padding-bottom: 2px;
    }

    .multiselect {
      width: 89px;
      color: #fff;
      background-color: #4284e3cc;
      border: none;
      border-radius: 6px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      &__tags {
        border: none;
        background-color: transparent;
      }

      &__single {
        background-color: transparent;
      }

      &__input {
        background-color: transparent;
        color: #fff;
      }

      &__select:before {
        border-color: #fff transparent transparent;
      }

      &__option {
        color: #6e6e6e;
      }
    }
  }
</style>
