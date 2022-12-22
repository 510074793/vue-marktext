<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps()
const myCom = ref()
const getMarkdown = ()=>{
    console.log("获取到的markdown==>",myCom.value.getMarkdown());
}
const focus = ()=>{
    myCom.value.focusEditor()

}
const blur = ()=>{
    myCom.value.blurEditor()
}
</script>

<template>
    <div>
        <button @click="getMarkdown()">getMarkdown</button>
        <button @click="blur()">blurEditor</button>
        <button @click="focus()">focusEditor</button>
        <vue-marktext ref="myCom"/>
    </div>
</template>

<style scoped>

</style>