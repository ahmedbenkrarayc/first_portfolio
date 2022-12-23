<template>
    <div class="w-full h-fit bg-[#03001e]">
        <div id="projects" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" class="sm:pt-[30px] md:pt-[55px]">
            <div class="w-[2px] bg-[#4bc0c8] h-20 mx-auto"></div>
            <div class="flex w-[80%] mx-auto">
                <div class="w-[60%] sm:h-20 md:h-28 border-t-2 border-l-2 border-[#4bc0c8]"></div>
                <div class="w-[40%]"></div>
            </div>
        </div>
        <h1 data-aos="fade-up-right" data-aos-easing="linear" data-aos-duration="1500" class="mt-4 font-['Inter', sans-serif] sm:text-[20px] md:text-[30px] sm:pl-2 md:pl-12 sm:font-[600] md:font-[700] gradient">My Projects</h1>
        <h1 data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" class="text-white font-['Inter', sans-serif] sm:font-[600] sm:px-1 md:font-[700] sm:text-[30px] md:text-[70px] mt-4 sm:pl-2 md:pl-12">Here is a selection of some of my projects. Including this website.</h1>
        <div data-aos="fade-up-right" data-aos-easing="linear" data-aos-duration="1500" class="w-full cursor-pointer md:mx-auto sm:px-[15px] md:px-[20px] mt-12 font-['Inter', sans-serif]">
            <swiper :autoplay="{delay: 2500, disableOnInteraction: false,}" :pagination="{dynamicBullets: true,}" :modules="modules" class="mySwiper">

                <swiper-slide v-for="item in projects" :key="item.id">
                    <ProjectCard :link="item.link" :img="item.picture" :title="item.title" :description="item.description"/>
                </swiper-slide>
                
            </swiper>
        </div>
        <div id="aboutme" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" class="sm:pt-[30px] md:pt-[55px]">
            <div class="w-[2px] bg-[#007aff] h-20 mx-auto"></div>
            <div class="flex w-[80%] mx-auto">
                <div class="w-[60%] sm:h-20 md:h-28 border-t-2 border-l-2 border-[#007aff]"></div>
                <div class="w-[40%]"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/pagination";

import { Pagination,Autoplay } from "swiper";

import ProjectCard from '@/components/ProjectCard.vue'

import firebase from '../config/firebase'

export default {
    name:'HomeProject',
    data(){
        return{
            modules: [Pagination,Autoplay],
            projects:[]
        }
    },
    components:{
        Swiper,
        SwiperSlide,
        ProjectCard
    },
    methods:{
        async getProjects(){
            await firebase.firestore.collection('Projects').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.projects.push(tmp)
                })
            })
        }
    },
    created(){
        this.getProjects()
    }
}
</script>

<style scoped>
    .gradient{
        @apply w-full h-fit bg-gradient-to-r from-[#ff7582] via-[#4bc0c8] to-[#ffb5a3] text-transparent bg-clip-text;
        background-size:400%;
        animation:animate 10s ease infinite;
    }

    @keyframes animate{
        0%{
            background-position: 0% 50%;
        }
        50%{
            background-position: 100% 50%;
        }
        100%{
            background-position: 0% 50%;
        }
    }

</style>