<template lang="pug">
  div.base-input
    input.base-input__input(
      v-model="inputModel"
    )
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    inputModel: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', +value)
      }
    }
  }
}
</script>

<style lang="scss">
  .base-input {
    width: 100px;
    height: 20px;
    background-color: #eee;
  }
</style>
