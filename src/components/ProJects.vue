<template>
    <div>
        <h1 class="text-white font-[700] w-[70%] mx-auto text-[30px] my-8" id="title" >Projects</h1>
        <div v-show="create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Image :</label>
                <label for="" class="block cursor-pointer w-full h-[350px]">
                    <img src="https://wallpaperaccess.com/full/21609.jpg" alt="" class="cimage w-full rounded-lg h-full object-cover">
                </label>
                <label for="image"  class="w-fit block px-8 outline-none text-[20px] font-[600] bg-[#000322] rounded-lg py-[14px] cursor-pointer mt-4">Choose an image</label>
                <input type="file" id="image" class="hidden">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                <input type="text" v-model="newpro.title" placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Link :</label>
                <input type="text" v-model="newpro.link" placeholder="Enter a link" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Description :</label>
                <textarea v-model="newpro.description" placeholder="Description" class="w-full scroll resize-none text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] h-40"></textarea>
            </div>
            <div class="mt-12">
                <button @click="createp()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Create</button>
            </div>  
        </div>

        <div v-show="!create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Image :</label>
                <label for="eimage" class="block cursor-pointer w-full h-[350px]">
                    <img :src="edit.picture" alt="" class="eimage w-full rounded-lg h-full object-cover">
                </label>
                
                <input id="eimage" type="file" class="hidden">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                <input type="text" v-model="edit.title" placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Link :</label>
                <input type="text" v-model="edit.link" placeholder="Enter a link" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
            </div>
            <div class="mt-8">
                <label for="" class="font-[600] text-[20px] mb-4 block">Description :</label>
                <textarea v-model="edit.description" placeholder="Description" class="w-full scroll resize-none text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] h-40"></textarea>
            </div>
            <div class="mt-12 grid grid-cols-2 gap-4">
                <button @click="update()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Edit</button>
                <button @click="deletep()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Delete</button>
            </div> 
            <div class="mt-8">
                <button @click="cancel()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Cancel</button>
            </div>   
        </div>
        <div class="my-20" id="data">
            <div class="md:w-[80%] lg:w-[60%] bg-[#000322] rounded-xl mx-auto py-4 my-8 flex justify-between px-4" v-for="item in projects" :key="item.id">
                <h1 class="text-white text-[20px] font-[600]"><i class="fa-solid fa-database text-[30px] mr-[8px]" ></i> {{item.title}}</h1>
                <h1 class="text-white text-[20px] font-[600] cursor-pointer" @click="change(item.id)"><i class="fa-solid fa-angle-right"></i></h1>
            </div>
        </div>

    </div>
</template>

<script>
import firebase from '../config/firebase'

export default {
    name:'ProJects',
    data(){
        return{
            create:true,
            projects:[],
            newpro:{},
            edit:{}
        }
    },
    methods:{
        cancel(){
            this.create = true
        },
        image(){
            document.getElementById('image').addEventListener('change',function(e){
                const file = e.target.files[0]
                document.querySelector('.cimage').setAttribute('src',URL.createObjectURL(file))
            })

            document.getElementById('eimage').addEventListener('change',function(e){
                const file = e.target.files[0]
                document.querySelector('.eimage').setAttribute('src',URL.createObjectURL(file))
            })
        },
        valid(){
            return this.newpro.title != '' && this.newpro.description != '' && this.newpro.title != null && this.newpro.description != null
        },
        async getProjects(){
            await firebase.firestore.collection('Projects').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id =  x.id
                    this.projects.push(tmp)
                })
            })
        },
        async createp(){
            if(this.valid()){
                const rand = Math.round(Math.random()*9999) + '' + new Date().getTime()
                const ref = firebase.Ref('pro'+rand+'.png')
                await firebase.upload(ref,document.getElementById('image').files[0]).then(() => {
                    firebase.download(ref).then(x => {
                        this.newpro.picture = x
                        if(this.newpro.link == null){
                            this.newpro.link = ''
                        }
                        firebase.firestore.collection('Projects').add(this.newpro).then((data) => {
                            const tmp = this.newpro
                            tmp.id = data.id
                            this.projects.push(tmp)
                            this.newpro = {}
                            document.getElementById('image').value = null
                            alert('created successfully')
                        })
                    })
                })
            }else{
                alert('please my perfect self, fill all the fields !')
            }
        },
        change(id){
            this.create = false
            this.edit = this.projects.find(x => x.id == id)
        },
        async update(){
            if(document.getElementById('eimage').value != null){
                const rand = Math.round(Math.random()*9999) + '' + new Date().getTime()
                const ref = firebase.Ref('pro'+rand+'.png')
                firebase.upload(ref,document.getElementById('eimage').files[0]).then(() => {
                    firebase.download(ref).then(x => {
                        this.edit.picture = x
                        this.editPro()
                    })
                })
            }else{
                this.editPro()
            }
        },
        async editPro(){
            await firebase.firestore.collection('Projects').doc(this.edit.id).get().then(data => {
                data.ref.update(this.edit).then(() => {
                    alert('updated successfully')
                })
            })
        },
        async deletep(){
            await firebase.firestore.collection('Projects').doc(this.edit.id).delete().then(() => {
                for(let i=0;i<this.projects.length;i++){
                    if(this.projects[i].id == this.edit.id){
                        this.projects.splice(i,1)
                    }
                }
                this.create = true
                alert('deleted successfully')
            })
        }
    },
    created(){
        this.getProjects()
    },
    mounted(){
        this.image()
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