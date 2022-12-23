<template>
  <div>
    <HomeHeader />
    <HomeQuote />
    <HomeProject />
    <AboutMe />
  </div>
</template>

<script>
import HomeHeader from '../components/HomeHeader.vue'
import HomeQuote from '../components/HomeQuote.vue'
import HomeProject from '../components/HomeProject.vue'
import AboutMe from '../components/AboutMe.vue'

export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    HomeQuote,
    HomeProject,
    AboutMe
  }
}
</script>

<style scoped>

</style>
