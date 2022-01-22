<template>
  <div>
    <section class="home">
      <Exchange />
    </section>
  </div>
</template>

<script>
import Exchange from '@/components/Exchange'
export default {
  layout: 'default',
  components: {
    Exchange
  }
}
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100vh;
    background-image: url(https://images.unsplash.com/photo-1498550744921-75f79806b8a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b0f6908fa5e81286213c7211276e6b3d&auto=format&fit=crop&w=1500&q=80);
    background-position: center top;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
