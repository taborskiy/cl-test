<template lang="pug">
  div.base-input
    input.base-input__input(
      v-model="inputModel"
    )
    //-       v-mask="decimal"
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    inputModel: {
      get() {
        return this.value
      },
      set(value) {
        const reg = /^\d*\.?\d*$/
        if(reg.test(value)) {
          this.$emit('input', +value)
        } else {
          this.$emit('input', value)
        }
      }
    }
  },
  methods: {
    decimal(value) {
      const reg = /^\d*\.?\d*$/
      if(reg.test(value)) {
        return value.split()  // plugin wait arr
      } else {
        // const popped = value.split('')  // mask logic need debag, if validation bad clear input value
        // popped.pop()
        // return popped
        return []
      }
    }
  }
}
</script>

<style lang="scss">
  .base-input {
    &__input {
      height: 36px;
      width: 225px;
      border: 1px solid #eee;
      font-size: 14px;
      border-radius: 6px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background: #ffffff !important;
      outline: none;
    }
  }
</style>
