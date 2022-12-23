<template>
    <div id="loginp">
        <div class="w-full py-[100px]">
            <div class="sm:w-full lg:w-[80%] h-[600px] grid md:grid-cols-2 mx-auto text-white">
                <div class="overflow-hidden object-cover min-h-[200px]">
                    <img class="w-full h-full" :src="require('../assets/images/wall.jpg')" alt="">
                </div>
                <div class="px-8 py-8 flex center">
                    <div class="w-full h-fit">
                        <h1 class="text-center font-[700] text-[30px]">Welcome Back</h1>
                        <h1 class="text-[red] font-bold mt-8 text-[20px]">{{error}}</h1>
                        <div class="mt-8">
                            <label for="" class="font-[600] text-[20px] mb-4 block">Email :</label>
                            <input type="text" v-model="auth.email" placeholder="Enter your email" class="w-full text-[20px] font-[600] rounded-lg bg-[#1f2038] outline-none px-4 py-[14px] ">
                        </div>  
                        <div class="mt-8">
                            <label for="" class="font-[600] text-[20px] mb-4 block">Password :</label>
                            <input type="password" v-model="auth.password" placeholder="Enter your password" class="w-full text-[20px] font-[600] rounded-lg bg-[#1f2038] outline-none px-4 py-[14px] ">
                        </div>  
                        <div class="mt-12">
                            <button @click="signIn()" class="w-full outline-none text-[20px] font-[700] bg-[#3d3b7c] hover:bg-purple-600 rounded-lg py-[14px]">Sign In</button>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { signInWithEmailAndPassword } from '@firebase/auth'
import firebase from '../config/firebase'
import router from '../router'

export default {
    name:'LoginView',
    data(){
        return{
            auth:{
                email:'',
                password:''
            },
            error:''
        }
    },
    methods:{
        signIn(){
            if(this.auth.email.length < 5){
                this.error = 'Enter a valid email'
                return
            }else{
                this.error = ''
            }

            if(this.auth.password.length < 8){
                this.error = 'Enter a valid password'
                return
            }else{
                this.error = ''
            }

            signInWithEmailAndPassword(firebase.auth,this.auth.email,this.auth.password).then(() => {
                router.push('/dashboard')
                this.error = ""
            }).catch(() => {
                this.error = "invalid email or password"
            })
        }
    },
    beforeMount(){
        firebase.auth.onAuthStateChanged((user) => {
            if(user){
                router.push('/dashboard')
            }
        })
    },
    mounted(){
        document.getElementById('loginp').addEventListener('keypress',e => {
            if(e.key == 'Enter'){
                this.signIn()
            }
        })
    }
}
</script>

<style scoped>
    .center{
        align-items: center;
        justify-content: center
    }
</style>