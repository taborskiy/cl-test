<template>
  <div class="main-layout">
    <nav-bar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  components: {
    NavBar,
    Footer
  }
}
</script>

<style lang="scss" scoped>
  .main-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #audio {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
  }
</style>
