<template>
    <div id="loader" class="fixed z-[1000] w-full h-screen bg-[#03001e] flex items-center justify-center ">
      <div class="circles">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
          <div class="circle5"></div>
          <div class="circle6"></div>
          <div class="circle7"></div>
          <div class="circle8"></div>
          <div class="circle9"></div>
          <div class="circle10"></div>
          <div class="circle11"></div>
          <div class="circle12"></div>
          <div class="circle13"></div>
          <div class="circle14"></div>
          <div class="circle15"></div>
      </div>
    </div>
    <div class="homeheader">
        <div class="w-full pt-[128px]">
            <!--mobile view-->
            <img :src="image" alt="" class="block mx-auto rounded-[50%] sm:w-[200px] md:hidden shadows">
            
            <div class="md:hidden sm:flex w-fit mt-12 float py-[6px] px-[1rem] bg-[#ffffff46] rounded-xl border-[1px] border-[#ffffff25] backdrop-blur-[7px] mx-auto">
                <h3 class="text-[28px] mr-4 my-auto">👋</h3>
                <div class="text-center pr-[20px]">
                    Hi! I am <span class="block font-[700] text-[26px] font-['Inter', sans-serif] opacity-80">Ahmed</span>
                </div>
            </div>
            <!-------------->
            <!--laptop view-->
            <div class="w-[90%] mx-auto sm:hidden md:flex">
                <div class="flex-1">
                    <div class="sm:hidden md:flex w-fit mt-20 float py-[10px] px-[1.5rem] bg-[#ffffff46] rounded-xl border-[1px] border-[#ffffff25] backdrop-blur-[7px] ml-auto mr-[-25px]">
                        <h3 class="text-[28px] mr-4 my-auto">👋</h3>
                        <div class="text-center pr-[20px]">
                            Hi! I am <span class="block font-[700] text-[26px] font-['Inter', sans-serif] opacity-80">Ahmed</span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 ">
                    <img :src="image" alt="" class="block mx-auto rounded-[50%] sm:w-[200px] md:w-[300px] shadows">
                </div>
                <div class="flex-1 ">
                    <div class="sm:hidden md:block ml-[-45px] w-fit py-[1rem] float px-[1rem] bg-[#ffffff46] rounded-xl border-[1px] border-[#ffffff25] backdrop-blur-[7px]">
                        <span class="font-[500] opacity-75 text-[20px] font-['Inter', sans-serif]">Web Developer <span class="text-[24px]">💻</span></span>
                    </div>
                </div>
            </div>
            <div class="sm:hidden md:block ml-[55%] mt-[-40px] w-fit py-[1rem] float px-[1rem] bg-[#ffffff46] rounded-xl border-[1px] border-[#ffffff25] backdrop-blur-[7px]">
                <span class="font-[500] opacity-75 text-[20px] font-['Inter', sans-serif]">Software Developer <span class="text-[24px]">📱</span></span>
            </div>
            <!-------------------->
            <h1 class="text-center mt-6 font-['Inter', sans-serif] text-white sm:text-[45px] md:text-[70px] sm:font-[400] md:font-[700]">Full stack develeoper</h1>
            <h3 class="text-center mt-1 font-['Inter', sans-serif] sm:font-[500] sm:text-[21px] md:font-[600] md:text-[25px] text-white opacity-60">Based in Safi, Morocco.</h3>
            <div class="w-[2px] opacity-30 mt-8 bg-white h-20 mx-auto "></div>
        </div>
    </div>
</template>

<script>
import firebase from '../config/firebase'

export default {
    name:'HomeHeader',
    data(){
        return{
            image:''
        }
    },
    methods:{
        async getImage(){
            await firebase.firestore.collection('Informations').get().then((data) => {
                data.forEach(x => {
                    this.image = x.data().picture
                })
                
            }).then(() => {
                this.clear()
            })
        },
        clear(){
            setTimeout(()=>{
                document.querySelector('#loader').remove()
            },2000)
        }
    },
    created(){
        this.getImage()
    }
}
</script>

<style scoped>
    .homeheader{
        @apply w-full h-fit bg-gradient-to-r from-[#ff7582] via-[#4bc0c8] to-[#ffb5a3];
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

    .shadows{
        box-shadow: -50px -20px 40px rgb(255 117 130 / 25%), 0px 50px 40px rgb(75 192 200 / 30%), 50px -20px 40px rgb(255 181 163 / 30%), 0 0 2pt 4pt rgb(255 255 255 / 60%);
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

    .circles {
    width:300px;
    height:300px;
    position:relative;
    margin:auto;
    }
    .circles > * {
    background-color:transparent;
    box-sizing:border-box;
    border:5px solid powderblue;
    border-top: 0 solid transparent;
    border-left: 0 solid transparent;
    border-radius: 50%;
    position:absolute;
    animation: spin 4s infinite linear alternate;
    }
        
    .circle1 {
    width: 300px; height: 300px;
    animation-delay:-5s;    
    border-color:rgba(163,207,213, 1);
    }
    .circle2 {
    width: 280px; height: 280px;
    top:10px;left:10px;
    animation-delay:-4.9s;
    border-color:rgba(163,207,213, .95);
    }
    .circle3 {
    width: 260px; height: 260px;
    top:20px;left:20px;
    animation-delay:-4.8s;
    border-color:rgba(163,207,213, .9);
    }
    .circle4 {
    width: 240px; height: 240px;
    top:30px;left:30px;
    animation-delay:-4.7s;
    border-color:rgba(163,207,213, .85);
    }
    .circle5 {
    width: 220px; height: 220px;
    top:40px;left:40px;
    animation-delay:-4.6s;
    border-color:rgba(163,207,213, .8);
    }
    .circle6 {
    width: 200px; height: 200px;
    top:50px;left:50px;
    animation-delay:-4.5s;
    border-color:rgba(163,207,213, .75);
    }
    .circle7 {
    width: 180px; height: 180px;
    top:60px;left:60px;
    animation-delay:-4.4s;
    border-color:rgba(163,207,213, .7);
    }
    .circle8 {
    width: 160px; height: 160px;
    top:70px;left:70px;
    animation-delay:-4.3s;
    border-color:rgba(163,207,213, .65);
    }
    .circle9 {
    width: 140px; height: 140px;
    top:80px;left:80px;
    animation-delay:-4.2s;
    border-color:rgba(163,207,213, .6);
    }
    .circle10 {
    width: 120px; height: 120px;
    top:90px;left:90px;
    animation-delay:-4.1s;
    border-color:rgba(163,207,213, .55);
    }
    .circle11 {
    width: 100px; height: 100px;
    top:100px;left:100px;
    animation-delay:-4s;
    border-color:rgba(163,207,213, .5);
    }
    .circle12 {
    width: 80px; height: 80px;
    top:110px;left:110px;
    animation-delay:-3.9s;
    border-color:rgba(163,207,213, .45);
    }
    .circle13 {
    width: 60px; height: 60px;
    top:120px;left:120px;
    animation-delay:-3.8s;
    border-color:rgba(163,207,213, .4);
    }
    .circle14 {
    width: 40px; height: 40px;
    top:130px;left:130px;
    animation-delay:-3.7s;
    border-color:rgba(163,207,213, .35);
    }
    .circle15 {
    width: 20px; height: 20px;
    top:140px;left:140px;
    animation-delay:-3.6s;
    border-color:rgba(163,207,213, .3);
    }
        
    @keyframes spin {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);};
    }
</style>