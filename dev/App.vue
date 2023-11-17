<script setup>
import { onMounted, ref } from 'vue';
import Muya from '../src/muya/lib/index';
import { openFileDialog } from "./utils";
import { rejects } from 'assert';

const props = defineProps()
const myCom = ref()
const getMarkdown = () => {
    console.log("获取到的markdown==>", myCom.value.getMarkdown());
}
const focus = () => {
    myCom.value.focusEditor()

}
const blur = () => {
    myCom.value.blurEditor()
}

const getEditor = () => {
    let editor = myCom.value.getEditor()
    console.log(editor);
}

const imgPicker = async () => {
    const fileData = await openFileDialog('image/*', true, 300, false, false, "选择图片")
    if (fileData) {
        const url = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'https://img.clm.show/api/v1/upload');
            xhr.onload = () => {
                if (xhr.status === 403) {
                    reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
                    return;
                }

                if (xhr.status < 200 || xhr.status >= 300) {
                    reject('HTTP Error: ' + xhr.status);
                    return;
                }

                const json = JSON.parse(xhr.responseText);

                if (!json) {
                    reject('Invalid JSON: ' + xhr.responseText);
                    return;
                }
                if (json.status == false) {
                    reject(json.message);
                    return;
                }
                console.log(json);
                resolve(json.data.links.url);
            };

            xhr.onerror = () => {
                reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
            };

            const formData = new FormData();
            formData.append('file', fileData[0]);

            xhr.send(formData);
        })

        return url
    }

    return ''
}

const saveFile = (e) => {
    console.log(e);
}

onMounted(() => {
    let editor = myCom.value.getEditor()
    if (editor instanceof Muya) {
        console.log(editor.getMarkdown());
        editor.copyAsHtml()
    }
})

</script>

<template>
    <div id="app">
        <div class="marktext-box">
            <vue-marktext ref="myCom" :markdown="'## Hi!'" :textDirection="'left'" :tabSize="4" :imgPicker="imgPicker"
                @save="saveFile" />
        </div>

    </div>
</template>

<style>
* {
    padding: 0;
    margin: 0;
}

html,
body {
    height: 100vh;
}

#app {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.marktext-box {
    width: 100%;
    min-width: 460px;
    height: 100%;
}
</style>