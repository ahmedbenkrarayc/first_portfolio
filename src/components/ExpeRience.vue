<template>
    <div>
        <h1 class="text-white font-[700] w-[70%] mx-auto text-[30px] my-8" id="title" >Experience</h1>
            <div v-if="create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Duration :</label>
                    <input type="text" v-model="newexp.duration" placeholder="Enter a duration" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                    <input type="text" v-model="newexp.title" placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Company :</label>
                    <input type="text" v-model="newexp.company" placeholder="Enter a company" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Time :</label>
                    <input type="text" v-model="newexp.time" placeholder="Enter a Time" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-12">
                    <button @click="createe()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Create</button>
                </div> 
            </div>
            <div v-if="!create" class="w-[70%] h-fit mx-auto text-white lg:px-16 rounded-xl">
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Duration :</label>
                    <input type="text" v-model="edit.duration" placeholder="Enter a duration" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Title :</label>
                    <input type="text" v-model="edit.title" placeholder="Enter a title" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Company :</label>
                    <input type="text" v-model="edit.company" placeholder="Enter a company" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-8">
                    <label for="" class="font-[600] text-[20px] mb-4 block">Time :</label>
                    <input type="text" v-model="edit.time" placeholder="Enter a time" class="w-full text-[20px] font-[600] rounded-lg bg-[#000322] outline-none px-4 py-[14px] ">
                </div>
                <div class="mt-12 grid grid-cols-2 gap-4">
                    <button @click="update()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Edit</button>
                    <button @click="deletee()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Delete</button>
                </div> 
                <div class="mt-8">
                    <button @click="cancel()" class="send w-full outline-none text-[20px] font-[700] bg-[#795cf4] hover:bg-[#795cf491] rounded-lg py-[14px]">Cancel</button>
                </div> 
            </div>

            <div class="my-20" id="data">
                <div class="md:w-[80%] lg:w-[60%] bg-[#000322] rounded-xl mx-auto py-4 my-8 flex justify-between px-4" v-for="item in experience" :key="item.id">
                    <h1 class="text-white text-[20px] font-[600]"><i class="fa-solid fa-layer-group text-[30px] mr-[8px]'" ></i> {{item.title}}</h1>
                    <h1 class="text-white text-[20px] font-[600] cursor-pointer" @click="change(item.id)"><i class="fa-solid fa-angle-right"></i></h1>
                </div>
            </div>
    </div>
</template>


<script>
import firebase from '../config/firebase'

export default {
    name: 'ExpeRience',
    data(){
        return{
            create:true,
            experience:[],
            newexp:{},
            edit:{}
        }
    },
    methods:{
        async getEdu(){
            await firebase.firestore.collection('Experience').get().then((data) => {
                data.forEach(x => {
                    const tmp = x.data()
                    tmp.id = x.id
                    this.experience.push(tmp)
                })

                this.sort()
            })
        },
        async createe(){
            if(this.newexp.title == null || this.newexp.duration == null || this.newexp.time == null || this.newexp.company == null){
                alert('fill all fields !')
                return
            }
            this.newexp.timestamp = new Date().getTime()
            await firebase.firestore.collection('Experience').add(this.newexp).then((data) => {
                this.newexp.id = data.id
                this.experience.push(this.newexp)
                this.sort()
                this.newexp = {}
                alert('created successfully')
            })
            
        },
        sort(){
            this.experience.sort((a,b) => parseInt(a.timestamp) - parseInt(b.timestamp))
        },
        change(id){
            this.create = false
            this.edit = this.experience.find(x => x.id == id)
        },
        cancel(){
            this.create = true
        },
        async update(){
            await firebase.firestore.collection('Experience').doc(this.edit.id).get().then((data) => {
                data.ref.update(this.edit).then(() => {
                    for(let i=0;i<this.experience.length;i++){
                        if(this.experience[i].id == this.edit.id){
                            this.experience[i] = this.edit
                            break
                        }
                    }
                    alert('updated successfully')
                })
            })
        },
        async deletee(){
            this.cancel()
            await firebase.firestore.collection('Experience').doc(this.edit.id).delete().then(() => {
                    for(let i=0;i<this.experience.length;i++){
                        if(this.experience[i].id == this.edit.id){
                            this.experience.splice(i,1)
                            break
                        }
                    }
                alert('deleted successfully')
            })
        }
    },
    created(){
        this.getEdu()
    }
}
</script>