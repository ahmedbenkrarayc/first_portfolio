<template>
    <div class="w-full flex">
        <div v-if="!mobile" class="scroll bg-[#000322] w-[120px] text-center h-[100vh] sticky top-0 text-white overflow-y-scroll">
            <div class="w-full h-16 overflow-hidden mb-10 py-[24px] text-center font-[700] text-[25px] text-[#795cf4]"><i class="fa-solid fa-database text-[35px] text-[#795cf4]"></i></div>

            <div @click="navigate(0)" title="Personal informations" class="links">
                <i class="fa-solid fa-book-open text-[25px]"></i>
            </div>
            <div @click="navigate(1)" title="Services" class="links mt-8">
                <i class="fa-solid fa-code text-[25px]"></i>
            </div>
            <div @click="navigate(2)" title="Projects" class="links mt-8">
                <i class="fa-solid fa-laptop-code text-[25px]"></i>
            </div>
            <div @click="navigate(3)" title="Skills" class="links mt-8">
                <i class="fa-brands fa-d-and-d text-[25px]"></i>
            </div>
            <div @click="navigate(4)" title="Education" class="links mt-8">
                <i class="fa-solid fa-graduation-cap text-[25px]"></i>
            </div>
            <div @click="navigate(5)"  title="Experience" class="links mt-8">
                <i class="fa-solid fa-briefcase text-[25px]"></i>
            </div>
            <div @click="logout()" title="Logout" class="links mt-8">
                <i class="fa-solid fa-right-from-bracket text-[25px]"></i>
            </div>
        </div>
        <div v-if="!mobile" class="w-full h-fit py-8">
            <InfoRmations v-if="page == 0"/>
            <SerVices v-if="page == 1"/>
            <ProJects v-if="page == 2" />
            <MySkills v-if="page == 3" />
            <EduCation v-if="page == 4" />
            <ExpeRience v-if="page == 5" />
        </div>

        <div v-if="mobile" class="mobile w-full h-screen relative">
            <div class="absolute m-auto inset-0 h-fit px-8">
                <h1 class="text-white font-[700] text-[20px] text-center">Sorry this app doesn't support mobile devices !</h1>
                <h1 class="text-white opacity-80 text-[18px] text-center">To use this app please use a computer or a tablet</h1>
            </div>
        </div>
    </div>
</template>

<script>

import InfoRmations from '@/components/InfoRmations.vue'
import SerVices from '@/components/SerVices.vue'
import ProJects from '@/components/ProJects.vue'
import MySkills from '@/components/MySkills.vue'
import EduCation from '@/components/EduCation.vue'
import ExpeRience from '@/components/ExpeRience.vue'
import firebase from '../config/firebase'
import router from '../router'

export default {
    data(){
        return{
            mobile:false,
            page:0
        }
    },
    components:{
        InfoRmations,
        SerVices,
        ProJects,
        MySkills,
        EduCation,
        ExpeRience
    },
    methods:{
        detectMobile(){
            const width = window.innerWidth
            if(width < 750){
                this.mobile = true
            }else{
                this.mobile = false
            }
        },navigate(page){
            this.page = page
        },
        logout(){
            firebase.auth.signOut().then(() => {
                router.push('/login')
            })
        }
    },
    created(){
        this.detectMobile()
        window.addEventListener('resize',this.detectMobile) 
    }
}
</script>

<style scoped>
    .scroll::-webkit-scrollbar {
        display: none;
    }

    .links{
        @apply block font-[700] text-[20px] overflow-hidden w-full p-[10px] h-[40px] pl-[10px] hover:text-[#795cf4] cursor-pointer; 
    }

</style>