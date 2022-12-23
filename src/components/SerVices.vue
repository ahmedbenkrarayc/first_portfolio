<template>
    <div>
        <h1 class="text-white font-[700] w-[70%] mx-auto text-[30px] my-8" id="title" >Services</h1>
        <div v-if="create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Icon (fontawesome) :</label>
                <input type="text" v-model="newserv.icon" placeholder="Enter an icon" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                <input type="text" v-model="newserv.title" placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">About :</label>
                <textarea v-model="newserv.description" placeholder="Description" class="w-full scroll resize-none text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] h-40"></textarea>
            </div>
            <div class="mt-12">
                <button @click="creates()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Create</button>
            </div>  
        </div>

        <div v-if="!create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Icon (fontawesome) :</label>
                <input type="text" v-model="edit.icon" placeholder="Enter an icon" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                <input type="text" v-model="edit.title" placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">About :</label>
                <textarea v-model="edit.description" placeholder="Description" class="w-full scroll resize-none text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] h-40"></textarea>
            </div>
            <div class="mt-12 grid grid-cols-2 gap-4">
                <button @click="update()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Edit</button>
                <button @click="deletes()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Delete</button>
            </div> 
            <div class="mt-8">
                <button @click="cancel()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Cancel</button>
            </div>  
        </div>

        <div class="my-20" id="data">
            <div class="md:w-[80%] lg:w-[60%] bg-[#000322] rounded-xl mx-auto py-4 my-8 flex justify-between px-4" v-for="item in services" :key="item.id">
                <h1 class="text-white text-[20px] font-[600]"><i :class=" item.icon+' text-[30px] mr-[8px]'" ></i> {{item.title}}</h1>
                <h1 class="text-white text-[20px] font-[600] cursor-pointer" @click="change(item.id)"><i class="fa-solid fa-angle-right"></i></h1>
            </div>
        </div>

    </div>
</template>

<script>
import firebase from '../config/firebase'

export default {
    name:'SerVices',
    data(){
        return{
            create:true,
            services:[],
            edit:{},
            id:'',
            newserv:{}
        }
    },
    methods:{
        async getservices(){
            await firebase.firestore.collection('Services').get().then((data) =>{
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.services.push(tmp)

                })
            })            
        },
        change(id){
            this.create = false
            this.edit = this.services.find(x => x.id == id)
            this.id = id
            document.getElementById('title').scrollIntoView({
                behavior:'smooth'
            })
        },
        cancel(){
            this.create = true
        },
        async update(){
            await firebase.firestore.collection('Services').doc(this.id).get().then((data) => {
                data.ref.update(this.edit).then(() => {
                    alert('updated successfully')
                })
            })
        },
        async creates(){
            await firebase.firestore.collection('Services').add(this.newserv).then((data) => {
                const tmp = this.newserv
                tmp.id = data.id
                this.services.push(tmp)
                this.newserv = {}
                alert('created successfully')
            })
        },
        async deletes(){
            await firebase.firestore.collection('Services').doc(this.id).delete().then(() => {
                for(let i=0;i<this.services.length;i++){
                    if(this.services[i].id == this.id){
                        this.services.splice(i,1)
                    }
                }
                this.create = true
                alert('deleted successfully')
            })
        }
    },
    created(){
        this.getservices()
    }

    
}
</script>

<style scoped>
    .maindiv{
        @apply float cursor-pointer backdrop-blur-[7px] bg-[#48355a63] py-[14px] px-[1.5rem] rounded-xl border-[1px] border-[#ffffff25];
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
</style>