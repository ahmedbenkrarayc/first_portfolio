<template>
    <div>
        <h1 class="text-white font-[700] w-[70%] mx-auto text-[30px] my-8" id="title" >My Skills</h1>
            <div v-if="create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                    <input type="text" v-model="newskill.title"  placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Icon Link :</label>
                    <input type="text" v-model="newskill.icon" placeholder="Enter an icon" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-12">
                    <button @click="creates()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Create</button>
                </div> 
            </div>

            <div v-if="!create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                    <input type="text" v-model="edit.title"  placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Icon Link :</label>
                    <input type="text" v-model="edit.icon" placeholder="Enter an icon" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-12 grid grid-cols-2 gap-4">
                    <button @click="update()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Edit</button>
                    <button @click="deletes()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Delete</button>
                </div> 
                <div class="mt-8">
                    <button @click="cancel()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Cancel</button>
                </div> 
            </div>

            <div class="sm:w-[90%] md:w-[90%] grid mx-auto sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1.5rem] mt-20">
                <div class=" p-[1rem] rounded-[.5rem] cursor-pointer" v-for="item in skills" :key="item.id" @click="change(item.id)">
                    <img class="h-[4rem] mb-4 mx-auto block" :src="item.icon" alt="">
                    <h1 class="text-center font-[600] text-white">{{item.title}}</h1>
                </div>
            </div>
    </div>
</template>

<script>
import firebase from '../config/firebase'

export default {
    name:'MySkills',
    data(){
        return{
            create:true,
            newskill:{},
            skills:[],
            edit:{}
        }
    },
    methods:{
        async getSkills(){
            await firebase.firestore.collection('Skills').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.skills.push(tmp)
                })
            })
        },
        async creates(){
            await firebase.firestore.collection('Skills').add(this.newskill).then((data) => {
                const tmp = this.newskill
                tmp.id = data.id
                this.skills.push(tmp)
                this.newskill = {}
                alert('created successfully')
            })
        },
        cancel(){
            this.create = true
        },
        async update(){
            await firebase.firestore.collection('Skills').doc(this.edit.id).get().then((data)=>{
                data.ref.update(this.edit).then(() => {
                    for(let i = 0; i<this.skills.length;i++){
                        if(this.skills[i].id == this.edit.id){
                            this.skills[i] = this.edit
                        }
                    }
                    alert('updated successfully')
                })
            })
        },
        change(id){
            this.create = false
            this.edit = this.skills.find(x => x.id == id)
        },
        async deletes(){
            await firebase.firestore.collection('Skills').doc(this.edit.id).delete().then(() => {
                this.create = true
                for(let i = 0; i<this.skills.length;i++){
                    if(this.skills[i].id == this.edit.id){
                        this.skills.splice(i,1)
                    }
                }
                alert('deleted successfully')
            })
        }
    },
    created(){
        this.getSkills()
    }
}
</script>