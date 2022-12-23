<template>
    <div class="w-full sm:py-10 md:py-16 md:min-h-[260px] md:px-0 lg:px-[90px] grid sm:grid-cols-1 md:grid-cols-5">
        <div class=" col-span-2 sm:h-[250px] md:min-h-[250px] md:max-h-[400px]"><img :src="img" alt="" class="rounded-xl object-fit w-full h-full" ></div>
        <div class="col-span-3 sm:mt-2 md:px-8 md:py-4">
            <h1 class="text-white font-[700] sm:text-[22px] md:text-[25px]" >{{title}}</h1>
            <h3 class="text-white font-[600] sm:text-[15px] md:text-[18px] opacity-70 mt-2">{{description}}</h3>
            <a :href="link" target="_blank" class="block text-white font-[600] sm:text-[15px] md:text-[18px] bg-[#007aff] w-fit rounded-md px-[1.5rem] py-[0.5rem] mt-4">Demo</a>
        </div>
    </div>
</template>

<script>
export default {
    name:'ProjectCard',
    props:['title','description','img','link']
}
</script>
