<template>
    <div class="w-fit h-fit">
        <h1 data-aos="fade-up-right" data-aos-easing="linear" data-aos-duration="1500" class="mt-4 sm:text-[20px] md:text-[30px] sm:pl-2 md:pl-12 sm:font-[600] md:font-[700] gradient">About Me</h1>
        <h1 data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" class="text-white sm:font-[600] sm:px-1 md:font-[700] sm:text-[20px] md:text-[25px] mt-4 sm:pl-2 md:pl-12">
            {{informations.about}}
        </h1>
        <h1 id="skills" data-aos="fade-up-right" data-aos-easing="linear" data-aos-duration="1500" class="gradient mt-6 sm:text-[20px] md:text-[30px] sm:pl-2 md:pl-12 sm:font-[600] md:font-[700] text-white"><i class="fa-solid fa-graduation-cap mr-2 sm:text-[25px] md:text-[34px]"></i>Education & Experience</h1>
        <div class="w-[80%] mt-10 mx-auto grid md:grid-cols-2 sm:grid-cols-1 sm:gap-20 md:gap-4">
            <div>
                <div data-aos="fade-down-right" data-aos-easing="linear" data-aos-duration="1500" class="text-white mb-8 before relative pt-1 pl-[20px]" v-for="item in education" :key="item.id">
                    <span class="bg-[#ffffff46] backdrop-blur-[7px] rounded-xl px-2 py-[2px] text-[16px] ">{{item.duration}}</span>
                    <h1 class="sm:text-[20px] sm:font-[600] md:text-[25px] md:font-[700] sm:mt-[14px] md:mt-[14px]">{{item.title}}</h1>
                    <h3 class="sm:text-[16px] md:text-[20px] md:font-[600] opacity-90">{{item.school}}</h3>
                    <h3 class="sm:text-[16px] md:text-[18px] md:font-[600] opacity-80">{{item.city}}</h3>
                </div>
            </div>
            <div>
                <div data-aos="fade-down-right" data-aos-easing="linear" data-aos-duration="1500" class="text-white mb-8 work relative pt-1 pl-[20px]" v-for="item in experience" :key="item.id">
                    <span class="bg-[#ffffff46] backdrop-blur-[7px] rounded-xl px-2 py-[2px] text-[16px] ">{{item.duration}}</span>
                    <h1 class="sm:text-[20px] sm:font-[600] md:text-[25px] md:font-[700] sm:mt-[14px] md:mt-[14px]">{{item.title}}</h1>
                    <h3 class="sm:text-[16px] md:text-[20px] md:font-[600] opacity-90">{{item.company}}</h3>
                    <h3 class="sm:text-[16px] md:text-[18px] md:font-[600] opacity-80">{{item.time}}</h3>
                </div>
            </div>
        </div>
        <h1 data-aos="fade-up-right" data-aos-easing="linear" data-aos-duration="1500" class="mt-14 sm:text-[20px] md:text-[30px] sm:pl-2 md:pl-12 sm:font-[600] md:font-[700] gradient"><i class="fa-brands fa-phoenix-framework mr-2 sm:text-[25px] md:text-[34px]"></i>Skills</h1>
        <div class="sm:w-[90%] md:w-[90%] grid mx-auto mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1.5rem]">
            <div data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="1500" class=" p-[1rem] rounded-[.5rem]" v-for="item in skills" :key="item.id">
                <img class="h-[4rem] mb-4 mx-auto block" :src="item.icon" alt="">
                <h1 class="text-center font-[600] text-white">{{item.title.toUpperCase()}}</h1>
            </div>                  
        </div>
        <div class="w-full bg-[#26243b] mt-32 pb-40">
            <div class="w-[2px] opacity-30 bg-white h-28 mx-auto "></div>
            <h1 class="text-center break-all text-white sm:font-[700] sm:text-[32px] md:font-[700] md:text-[60px] lg:text-[75px] gradient mt-16">Let's work together!</h1>
            <router-link to="/contact" class="block w-fit mx-auto text-white bg-[#26243b] font-[500] sm:text-[23px] md:text-[26px] shad rounded-full px-[2rem] py-[1rem] mt-10 hover:bg-purple-500 translate">Contact me</router-link>
        </div>
        <FooterVe />
    </div>
</template>

<script>
import FooterVe from '@/components/FooterVe.vue'
import firebase from '../config/firebase'

export default {
    name:'AboutMe',
    data(){
        return{
            informations:{},
            education:[],
            experience:[],
            skills:[]
        }
    },
    components:{
        FooterVe
    },
    methods:{
        async getInfo(){
            await firebase.firestore.collection('Informations').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.informations = tmp
                })
            })
        },
        async getEdu(){
            await firebase.firestore.collection('Education').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.education.push(tmp)
                })
                this.sort(this.education)
            })
        },
        sort(array){
            array.sort((a,b) => parseInt(a.timestamp) - parseInt(b.timestamp))
        },
        async getExp(){
            await firebase.firestore.collection('Experience').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.experience.push(tmp)
                    this.experience.sort((a,b) => {a.timestamp - b.timestamp})
                })
            })
            this.sort(this.experience)
        },
        async getSkills(){
            firebase.firestore.collection('Skills').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.skills.push(tmp)
                })
            })
        }
    },
    created(){
        this.getInfo()
        this.getEdu()
        this.getExp()
        this.getSkills()
    }
}
</script>

<style scoped> 
    .translate{
        transition:1s;
    }

    .translate:hover{
        transition: 1s;
        transform: translatey(-7px);
    }

    .shad{
        box-shadow: 0px 8px 30px rgb(23 9 44 / 37%);
    }

    .before::before{
        content:'';
        position:absolute;
        background:#007aff;
        width:1px;
        height:calc(100% + 34px);
        top:0;
        left:-10px;
    }
    
    .before::after{
        content:'\f19d';
        font-family: "FontAwesome";
        position:absolute;
        background:#007aff;
        width:30px;
        height:30px;
        top:0;
        left:-25px;
        border-radius: 50%;
        display:flex;
        align-items: center;
        justify-content: center;
        font-size:15px;
    }

    .work::before{
        content:'';
        position:absolute;
        background:#007aff;
        width:1px;
        height:calc(100% + 34px);
        top:0;
        left:-10px;
    }

    .work::after{
        content:'\f0b1';
        font-family: "FontAwesome";
        position:absolute;
        background:#007aff;
        width:30px;
        height:30px;
        top:0;
        left:-25px;
        border-radius: 50%;
        display:flex;
        align-items: center;
        justify-content: center;
        font-size:15px;
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

    #opacity{
        opacity: .8;
    }
</style>