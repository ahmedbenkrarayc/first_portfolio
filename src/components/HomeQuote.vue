<template>
    <div class="w-full h-fit bg-[#03001e] font-['Inter', sans-serif]">
        <div class="w-[2px] opacity-30 bg-white h-20 mx-auto "></div>
        <h1 data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" class="text-white font-['Inter', sans-serif] text-center sm:font-[600] sm:px-1 md:font-[700] sm:text-[30px] md:text-[70px]">Success is a lousy teacher. It seduces smart people into thinking <span class="gradient">they can't lose.</span></h1>
        <h3 data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" id="bill" class="text-center mt-1 font-['Inter', sans-serif] sm:font-[500] sm:text-[21px] md:font-[600] md:text-[30px] text-white opacity-60">- Bill Gates</h3>
        <div id="services" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" class="sm:mt-[30px] md:mt-[55px]">
            <div class="w-[2px] bg-[#4bc0c8] h-20 mx-auto"></div>
            <div class="flex w-[80%] mx-auto">
                <div class="w-[60%] sm:h-20 md:h-28 border-t-2 border-l-2 border-[#4bc0c8]"></div>
                <div class="w-[40%]"></div>
            </div>
        </div>
        <h1 data-aos="fade-up-right" data-aos-easing="linear" data-aos-duration="1500" class="mt-4 font-['Inter', sans-serif] sm:text-[20px] md:text-[30px] sm:pl-2 md:pl-12 sm:font-[600] md:font-[700] gradient">My Services</h1>
        <h1 data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" class="text-white font-['Inter', sans-serif] sm:font-[600] sm:px-1 md:font-[700] sm:text-[30px] md:text-[70px] mt-4 sm:pl-2 md:pl-12">Translating business requirements into creative technical solutions.</h1>
        <div class="w-full mt-12 grid sm:grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-[12px] lg:grid-cols-3 lg:gap-x-[20px] px-4">
            <div class="maindiv" v-for="item in services" :key="item.id">
                <h1 class="maintitle"><i :class="item.icon +' text-[30px] mr-[8px]'" ></i> {{item.title}}</h1>
                <h3 class="maindetails mt-[0.5rem] font-[15px]">{{item.description}}</h3>
            </div>
        </div>

    </div>
</template>

<script>
import AOS from "aos";
import firebase from '../config/firebase'

//import VanillaTilt from 'vanilla-tilt';
export default {
    name:'HomeQuote',
    data(){
        return{
            services:[]
        }
    },
    methods:{
        async getServ(){
            await firebase.firestore.collection('Services').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.services.push(tmp)
                })
            })
        }
    },
    mounted(){
        AOS.init()
        /*VanillaTilt.init(document.querySelector('.card'), {
            max: 25,
            speed: 400,
            transition:true,
        })*/
    },
    created(){
        this.getServ()
    }
}
</script>

<style scoped>

    .maindiv{
        @apply float cursor-pointer backdrop-blur-[7px] bg-[#48355a63] py-4 px-[1.5rem] rounded-xl border-[1px] border-[#ffffff25];
    }

    .maintitle{
        @apply bg-gradient-to-r from-[#20bdff] to-[#a5fecb] text-transparent bg-clip-text sm:text-[25px] md:text-[28px] sm:font-[600] md:font-[700];
    }

    .maindetails{
        @apply  opacity-80 font-[600] text-[#f2f6f9];
    }

    .float{
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float{
        0%{
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.11);
            transform: translatey(0px);
        }

        50%{
            box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.11);
            transform: translatey(-7px);
        }

        100%{
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.11);
            transform: translatey(0px);
        }
    }

    #bill{
        opacity: 60%;
    }

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