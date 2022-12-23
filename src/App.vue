<template>
  <nav v-if="!disable.includes($route.path)" id="nav" class="fixed z-10 w-full px-2 py-[16px] backdrop-blur-md text-white flex sm:flex-wrap">
    <router-link to="/" class="text-[20px] font-[600] block sm:align-middle md:ml-auto sm:w-1/2 md:w-auto">Ahmed Benkrara</router-link>
    <div class="menu">
      <div class="rounded-sm py-2 space-y-[6px] w-fit ml-auto cursor-pointer" @click="slidedown()">
        <span class="block rounded w-[28px] h-0.5 bg-gray-100 "></span>
        <span class="block rounded w-[28px] h-0.5 bg-gray-100 "></span>
        <span class="block rounded w-[28px] h-0.5 bg-gray-100 "></span>
      </div>
    </div>
    <div id="links" class="md:flex md:mx-auto sm:h-0 md:h-fit overflow-hidden">
          
          <router-link :to="{name:'home' , hash:'#services'}" class="link" >Services</router-link>
          <router-link :to="{name:'home', hash:'#projects'}" class="link" >Projects</router-link>
          <router-link :to="{name:'home', hash:'#aboutme'}" class="link" >About me</router-link>
          <router-link :to="{name:'home', hash:'#skills'}" class="link" >Skills</router-link>
          <router-link to="/contact" class="text-base mt-[4px] md:ml-[12px] md:hidden">Let's Talk</router-link>

    </div>
    <router-link to="/contact" class="text-base mt-[4px] sm:hidden md:mr-auto  md:block">Let's Talk</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {
  data(){
    return{
      change:true,
      disable:['/dashboard']
    }
  },
  methods:{
    slidedown(){
      var elm = document.getElementById('links')
      var el = document.getElementById('nav')
      elm.style.transition = "all 5s ease-in-out"
      if(this.change){
        elm.style.height = "fit-content"
        el.style.background = "rgba(129, 46, 148, 0.178)"
        this.change = false
      }else{
        elm.style.height = "0px"
        elm.removeAttribute('style')
        el.removeAttribute('style')
        this.change = true
      }
    }
  }
}
</script>

<style>

  ::-webkit-scrollbar {
    width: 1px;
  }

  ::-webkit-scrollbar-track {
    background: #03001e;
  }

  ::-webkit-scrollbar-thumb {
    background: #007aff;
    border-radius:20px;
  }

  nav{
    font-family: 'Inter', sans-serif;
  }

  .menu{
    @apply md:hidden md:w-0 sm:w-1/2 sm:block;
  }

  .link{
    @apply text-base md:mt-[4px] md:ml-[12px] sm:my-2 block ;
  }
</style>
