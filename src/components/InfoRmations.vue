<template>
    <div>
        <h1 class="text-white font-[700] w-[70%] mx-auto text-[30px] my-8" >About me</h1>
        <div class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
            <label for="image">
                <img id="img" class="w-[200px] object-cover h-[200px] shadow-xl bg-[#000322] rounded-full block mx-auto cursor-pointer" :src="information.picture" alt="">
            </label>
            
            <input type="file" id="image" class="hidden">
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Email :</label>
                <input type="text" v-model="information.email" placeholder="Enter your email" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Facebook :</label>
                <input type="text" v-model="information.facebook" placeholder="Enter your facebook" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">LinkedIn :</label>
                <input type="text" v-model="information.linkedin" placeholder="Enter your linkedin" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Github :</label>
                <input type="text" v-model="information.github" placeholder="Enter your github" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Whatsapp :</label>
                <input type="text" v-model="information.whatsapp" placeholder="Enter your whatsapp" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">About :</label>
                <textarea placeholder="Description" v-model="information.about" class="w-full scroll resize-none text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] h-40"></textarea>
            </div>
            <div class="mt-12">
                <button @click="update()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Update Info</button>
            </div>  
        </div>
    </div>
</template>

<script>
import firebase from '../config/firebase'
import "firebase/compat/storage"

export default {
    name:'InfoRmations',
    data(){
        return{
            information:{}
        }
    },methods:{
        async getInfo(){
            await firebase.firestore.collection('Informations').get().then((data) => {
                data.forEach(x => {
                this.information = x.data()
                })
            })
        },
        async update(){
            if(typeof document.getElementById('image').files[0] != 'undefined'){
                const ref = firebase.Ref('me.png')
                await firebase.upload(ref,document.getElementById('image').files[0]).then(() => {
                    firebase.download(ref).then(x=> this.information.picture = x).then(() => {
                        this.edit()
                    })
                })
            }else{
                this.edit()
            }

        },
        async edit(){
            
            await firebase.firestore.collection('Informations').get().then(data => {
                document.querySelector('.send').disabled = true
                data.forEach(x => {
                    document.querySelector('.send').setAttribute('disabled','true')
                    x.ref.update(this.information).then(() => {
                        alert('updated successfully')
                        document.querySelector('.send').disabled = false
                        })
                    
                }) 
            })
        }
    },
    created(){
        this.getInfo()  
    },mounted(){
        document.getElementById('image').addEventListener('change',function(e){
            const file = e.target.files[0]
            document.getElementById('img').setAttribute('src',URL.createObjectURL(file))
        })
    }
}
</script>

<style scoped>
    .scroll::-webkit-scrollbar {
        display: none;
    }
</style>