<template>
    <div>
        <footer class="w-full border-t-[1px] border-t-purple-500 bg-[#26243b] text-white pt-4 pb-8 md:flex md:justify-around">
            <div class="w-fit mx-auto sm:hidden md:block md:text-[22px] font-[600]">Ahmed Benkrara &copy; 2022</div>
            <div class="w-fit mx-auto sm:text-[18px] md:text-[22px] font-[600]">
                <a :href="informations.linkedin" target="_blank" class="mr-[12px] hover:text-purple-500 duration-1000" >LinkedIn</a>
                <a :href="informations.github" target="_blank" class="mr-[12px] hover:text-purple-500 duration-1000" >Github</a>
                <a :href="informations.facebook" target="_blank" class="mr-[12px] hover:text-purple-500 duration-1000" >Facebook</a>
                <a :href="informations.whatsapp" target="_blank" class="hover:text-purple-500 duration-1000">Whatsapp</a>
            </div>
            <div class="w-fit mx-auto font-[600] sm:mt-1 sm:block md:hidden">Ahmed Benkrara &copy; {{new Date().getYear()}}</div>
        </footer>
    </div>
</template>

<script>
import firebase from '../config/firebase'

export default {
    name:'FooterVe',
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