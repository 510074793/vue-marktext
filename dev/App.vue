<script setup>
import { onMounted, ref } from 'vue';
import Muya from '../src/muya/lib/index';
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

const getEditor = ()=>{
    let editor = myCom.value.getEditor()
    console.log(editor);
}

onMounted(()=>{
    let editor = myCom.value.getEditor()
    if(editor instanceof Muya){
        console.log(editor.getMarkdown());
        editor.copyAsHtml()
    }
})

</script>

<template>
    <div>
        <button @click="getMarkdown()">getMarkdown</button>
        <button @click="blur()">blurEditor</button>
        <button @click="focus()">focusEditor</button>
        <hr/>
        <vue-marktext 
        ref="myCom" 
        :markdown="'## Hi!'"
        :tabSize="2"/>
    </div>
</template>

<style scoped>
.__editor-container>>>.__wapper-editor #ag-editor-id{
    max-height: 300px;
}
</style>