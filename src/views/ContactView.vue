<template>
    <div class="homeheader">
        <div class="w-full h-screen flex center ">
            <div class="sm:w-[90%] md:w-[80%] lg:w-[60%] py-8 px-2 backdrop-blut-[7px] border-[1px] border-[#ffffff46] bg-[#ffffff46] rounded-xl">
                <img :src="informations.picture" alt="" class="block mx-auto rounded-[50%] sm:w-[150px] md:w-[200px] shadows">
                <h1 class="text-center text-white font-[700] break-all sm:text-[20px] md:text-[30px] mt-8">{{informations.email}}</h1>
                <div class="w-fit mx-auto mt-2 text-white sm:text-[40px] md:text-[45px] lg:text-[50px]">
                    <a :href="informations.linkedin" target="_blank"><i class="fa-brands fa-linkedin hover"></i></a>
                    <a :href="informations.github" target="_blank"><i class="fa-brands fa-github-square sm:mx-10 md:mx-16 lg:mx-20 hover"></i></a>
                    <a :href="informations.whatsapp" target="_blank"><i class="fa-brands fa-whatsapp-square hover"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../config/firebase'

export default {
    data(){
        return{
            informations:{}
        }
    },
    methods:{
        async getInfo(){
            await firebase.firestore.collection('Informations').get().then((data) => {
                data.forEach(x => {
                    this.informations = x.data()
                })
            })
        }
    },created(){
        this.getInfo()
    }   
}
</script>

<style scoped>

    .hover:hover{
        @apply opacity-80;
    }

    .center{
        align-items: center;
        justify-content: center
    }

    .shadows{
        box-shadow: -50px -20px 40px rgb(255 117 130 / 25%), 0px 50px 40px rgb(75 192 200 / 30%), 50px -20px 40px rgb(255 181 163 / 30%), 0 0 2pt 4pt rgb(255 255 255 / 60%);
    }

    .homeheader{
        @apply bg-gradient-to-r from-[#ff7582] via-[#4bc0c8] to-[#ffb5a3];
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