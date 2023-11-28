<script setup>
//vue
import { ref, onMounted, reactive, watch } from 'vue'

//path-browserify
import path from 'path'

//Muya
import Muya from '../muya/lib'
import TablePicker from '../muya/lib/ui/tablePicker'
import QuickInsert from '../muya/lib/ui/quickInsert'
import CodePicker from '../muya/lib/ui/codePicker'
import EmojiPicker from '../muya/lib/ui/emojiPicker'
import ImagePathPicker from '../muya/lib/ui/imagePicker'
import ImageSelector from '../muya/lib/ui/imageSelector'
// import ImageSelector from '../muya/lib/ui/imageSelector-browserify'
import FormatPicker from '../muya/lib/ui/formatPicker'
import FrontMenu from '../muya/lib/ui/frontMenu'
import ImageToolbar from '../muya/lib/ui/imageToolbar'
import Transformer from '../muya/lib/ui/transformer'

import { getHtmlToc } from '../util/pdf'

//keybindings
import { MuyaKeybinder } from './keybindings'
import { CommandManager } from '../command'

//css
import '../muya/themes/default.css'
import '../assets/styles/index.css'
import '../assets/styles/printService.css'

//component
import ToolBar from './Toolbar.vue'


const emit = defineEmits(['change', 'save'])
const props = defineProps({
    markdown: {
        type: String,
        default: 'Welcome to use muya...'
    },
    textDirection: {
        type: String,
        required: true
    },
    fontSize: {
        type: Number,
        default: 16
    },
    lineHeight: {
        type: Number,
        default: 1.6
    },
    tabSize: {
        type: Number,
        required: false,
        default: 4
    },
    isHtmlEnabled: {
        type: Boolean,
        required: false,
        default: true
    },
    codeFontSize: {
        type: Number,
        required: false,
    },
    codeBlockLineNumbers: {
        type: Number,
        required: false,
    },
    baseDirPath: {
        type: String,
        default: './'
    },
    imgPicker: {
        type: Function,
        default: () => { }
    }

})



let editor = undefined
const muyaElement = ref(null)
const wapperEditor = ref(null)
const toolComponent = ref(null)
// let keybinder = new MuyaKeybinder()
let commandManager = new CommandManager()

//Method
const getMarkdown = () => {
    return editor.getMarkdown()
}
const blurEditor = () => {
    editor.blur(false, true)
}
const focusEditor = () => {
    editor.focus()
}
const getEditor = () => {
    return editor
}

const exportFile = (content, type, fileName) => {
    let blob = new Blob([content], { type })
    //IE
    if ("msSaveOrOpenBlob" in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        link.click()
    }
}
const exportMarkDown = () => {
    // exportFile(editor.getMarkdown(), 'application/txt', 'markdown.md')
    emit('save', editor.getMarkdown())

}
const exportHtml = () => {
    let options = {
        autoNumberingHeadings: false,
        htmlTitle: "",
        isLandscape: false,
        pageMarginBottom: 20,
        pageMarginLeft: 15,
        pageMarginRight: 15,
        pageMarginTop: 20,
        pageSize: "A4",
        pageSizeHeight: 297,
        pageSizeWidth: 210,
        showFrontMatter: false,
        theme: null,
        tocIncludeTopHeading: true,
        tocTitle: "",
        type: "styledHtml",
    }
    const htmlToc = getHtmlToc(editor.getTOC(), options)
    editor.exportStyledHTML({
        title: 'test',
        printOptimization: false,
        toc: htmlToc
    }).then(content => {
        exportFile(content, 'application/html', 'markdown.html')
    }).catch(err => {
        console.log(err);
    })
}

const setMarkdownToEditor = ({ id, markdown, cursor }) => {
    if (editor) {
        editor.clearHistory()
        if (cursor) {
            editor.setMarkdown(markdown, cursor, true)
        } else {
            editor.setMarkdown(markdown)
        }
    }
}


const imageAction = async (image, id, alt = '') => {
    return path.join(props.baseDirPath, image)
}

const format = ({ type }) => {
    commandManager.execute(`format.${type}`, editor)
}
const paragraph = ({ type }) => {
    commandManager.execute(`paragraph.${type}`, editor)
}


//watch 
watch(() => props.markdown, (value, oldValue) => {
    setMarkdownToEditor({ markdown: value })
})

watch(() => props.fontSize, (value, oldValue) => {
    if (value !== oldValue && editor) {
        editor.setFont({ fontSize: value })
    }
})

watch(() => props.lineHeight, (value, oldValue) => {
    if (value !== oldValue && editor) {
        editor.setFont({ lineHeight: value })
    }
})

watch(() => props.tabSize, (value, oldValue) => {
    if (value !== oldValue && editor) {
        editor.setTabSize(value)
    }
})

watch(() => props.fontSize, (value, oldValue) => {
    if (value !== oldValue && editor) {
        editor.setOptions({ disableHtml: !value }, true)
    }
})

watch(() => props.codeFontSize, (value, oldValue) => {

})

watch(() => props.codeBlockLineNumbers, (value, oldValue) => {
    if (value !== oldValue && editor) {
        editor.setOptions({ codeBlockLineNumbers: value }, true)
    }
})

onMounted(() => {
    Muya.use(TablePicker)
    Muya.use(QuickInsert)
    Muya.use(CodePicker)
    Muya.use(EmojiPicker)
    Muya.use(ImagePathPicker)
    Muya.use(ImageSelector)

    Muya.use(Transformer)
    Muya.use(ImageToolbar)
    Muya.use(FormatPicker)
    Muya.use(FrontMenu)
    window.DIRNAME = ''

    editor = new Muya(muyaElement.value, {
        markdown: props.markdown,
        disableHtml: !props.isHtmlEnabled,
        imagePathPicker: props.imgPicker,
        imageAction: imageAction.bind(this),
        isBrowserify: true,
        fontSize: props.fontSize,
        lineHeight: props.lineHeight,
        tabSize: props.tabSize
    })
    muyaElement.value = editor.container
    let wapperElement = wapperEditor.value

    let keybinder = new MuyaKeybinder()
    let commandManager = new CommandManager()

    if (wapperElement instanceof HTMLElement) {
        wapperElement.addEventListener("keydown", event => {
            if (event.isComposing) return
            let command = keybinder.findCommand(event)
            if (command) {
                commandManager.execute(command, editor)
                event.preventDefault()
                event.stopPropagation()
            }
        }, true)
    }

    editor.on('change', changes => {
        emit('change', changes)
    })
})

defineExpose({
    getMarkdown,
    blurEditor,
    focusEditor,
    getEditor
})


</script>

<template>
    <div class="__editor-container">
        <ToolBar @format="format" @paragraph="paragraph" @export="exportMarkDown" ref="toolComponent" />
        <div class="__wapper-editor" ref="wapperEditor">
            <div id="vue-markdown-muya" ref="muyaElement"></div>
        </div>
    </div>
</template>

<style scoped>
@import '../muya/themes/default.css';
@import '../assets/styles/index.css';
@import '../assets/styles/printService.css';


.__editor-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.__wapper-editor {
    width: 100%;
    height: 100%;
    flex: 1;
}

#vue-markdown-muya {
    width: 100%;
    height: 100%;
}

.__wapper-editor>>>#ag-editor-id {
    /* box-shadow: 0 2px 3px 1px #ddd; */
    max-height: 660px;
    overflow-y: auto;

    max-width: 100% !important;
}

.__wapper-editor>>>#ag-editor-id img {
    max-width: 80%;
}

.__wapper-editor ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
}

.__wapper-editor ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 1);
    border-radius: 5px;
    background-color: #F5F5F5;
}

.__wapper-editor ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #CCC9C9;
}
</style>