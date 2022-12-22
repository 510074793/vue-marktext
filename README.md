# vue-marktext

- [vue-marktext](#vue-marktext)
  - [Install](#install)
  - [Use](#use)
    - [Global component](#global-component)
    - [Local component](#local-component)
    - [config](#config)
  - [Show](#show)
  - [Shortcut key](#shortcut-key)
  - [Component props options](#component-props-options)
    - [Example](#example)
  - [Component defineExpose Method](#component-defineexpose-method)
    - [Example](#example-1)
  - [Component Events](#component-events)
  - [Muya Editor](#muya-editor)


## Install

The source code is provided, so compilation is required.So you need configure svg-sprite-loader to load svg.

if you want to use umd package, please copy from node_modules/vue3-marktext/lib/vue-marktext.umd.xxx.js to public/js(Static resources)

```shell
npm install vue3-marktext --save
npm install svg-sprite-loader svgo svgo-loader -D
```



## Use

### Global component

```js
import VueMarktext from 'vue3-marktext'
//you can use umd package,but you need copy from node_modules/vue3-marktext/lib/vue-marktext.umd.xxx.js to public/js(Static resources)
//import VueMarktext from 'vue3-marktext/lib/vue-marktext.umd.js'
createApp(App).use(VueMarktext)
```

### Local component

```js
import {VueMarktext} from 'vue3-marktext'

export default defineComponent({
  components: {
	VueMarktext
  },
})
```

### config

The source code is provided, so compilation is required. Please configure the following information in the `vue.config.js` file

```js
const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.clear()
    config.module
      .rule('svg-sprite').test(/\.svg$/)
      .include.add(resolve(__dirname,'node_modules/vue3-marktext/src/')).end()
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({}).end()
      .before('svg-sprite-loader')
      .use('svgo-loader').loader('svgo-loader')
      .options({
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: 'fill'
            }
          }
        ]
      }).end();
     config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin')).end()
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify")
      },
    }
  }
})
```



## Show

![show](./doc/imgs/show.png)

## Shortcut key

```js
// Edit menu
    ['edit.undo', 'Ctrl+Z'],
    ['edit.redo', 'Ctrl+Shift+Z'],
    ['edit.cut', 'Ctrl+X'],
    ['edit.copy', 'Ctrl+C'],
    ['edit.paste', 'Ctrl+V'],
    ['edit.copy-as-markdown', 'Ctrl+Shift+C'],
    ['edit.copy-as-html', ''],
    ['edit.paste-as-plaintext', 'Ctrl+Shift+V'],
    ['edit.select-all', 'Ctrl+A'],
    ['edit.duplicate', 'Ctrl+Alt+D'],
    ['edit.create-paragraph', 'Ctrl+Shift+N'],
    ['edit.delete-paragraph', 'Ctrl+Shift+D'],
    ['edit.find', 'Ctrl+F'],
    ['edit.find-next', 'F3'],
    ['edit.find-previous', 'Shift+F3'],
    ['edit.replace', 'Ctrl+R'],


    // Paragraph menu
    // NOTE: We cannot set a default value for heading size because `Ctrl+Alt` is an alias
    //       to `AltGr` on Windows and `Ctrl+Shift+1` is mapped to the underlying character.
    ['paragraph.heading-1', 'Ctrl+1'],
    ['paragraph.heading-2', 'Ctrl+2'],
    ['paragraph.heading-3', 'Ctrl+3'],
    ['paragraph.heading-4', 'Ctrl+4'],
    ['paragraph.heading-5', 'Ctrl+5'],
    ['paragraph.heading-6', 'Ctrl+6'],
    ['paragraph.upgrade-heading', 'Ctrl+Plus'],
    ['paragraph.degrade-heading', 'Ctrl+-'],
    ['paragraph.table', 'Ctrl+Shift+Y'],
    ['paragraph.code-fence', 'Ctrl+Shift+K'],
    ['paragraph.quote-block', 'Ctrl+Shift+Q'],
    ['paragraph.math-formula', 'Ctrl+Alt+N'],
    ['paragraph.html-block', 'Ctrl+Alt+H'],
    ['paragraph.order-list', 'Ctrl+G'],
    ['paragraph.bullet-list', 'Ctrl+H'],
    ['paragraph.task-list', 'Ctrl+Alt+X'],
    ['paragraph.loose-list-item', 'Ctrl+Alt+L'],
    ['paragraph.paragraph', 'Ctrl+Shift+0'],
    ['paragraph.horizontal-line', 'Ctrl+Shift+U'],
    ['paragraph.front-ma  tter', 'Ctrl+Alt+Y'],

    // Format menu
    ['format.strong', 'Ctrl+B'],
    ['format.emphasis', 'Ctrl+I'],
    ['format.underline', 'Ctrl+U'],
    ['format.superscript', ''],
    ['format.subscript', ''],
    ['format.highlight', 'Ctrl+Shift+H'],
    ['format.inline-code', 'Ctrl+`'],
    ['format.inline-math', 'Ctrl+Shift+M'],
    ['format.strike', 'Ctrl+D'],
    ['format.hyperlink', 'Ctrl+L'],
    ['format.image', 'Ctrl+Shift+I'],
    ['format.clear-format', 'Ctrl+Shift+R'],
```

## Component props options

| prop          | descrition                                        | type    | default                |
| ------------- | ------------------------------------------------- | ------- | ---------------------- |
| markdown      | initial markdown string                           | string  | Welcome to use muya... |
| fontSize      | fontSize for editor(to new Muya(element,{}))      | number  | 16                     |
| lineHeight    | line height                                       | number  | 1.6                    |
| tabSize       | Tab key size(How many spaces does a tab key have) | number  | 4                      |
| isHtmlEnabled | html enabled                                      | Boolean | true                   |

### Example

```html
<template>
    <div>
        <vue-marktext 
            ref="marktextRef" 
            :markdown="'## Hi!'"
            :tabSize="2"/>
    </div>
</template>
```



## Component defineExpose Method

| Method        | descrition                                                   |
| ------------- | ------------------------------------------------------------ |
| getMarkdown() | get current Markdown text                                    |
| blurEditor()  | blur current Editor                                          |
| focusEditor() | focus current Editor                                         |
| getEditor()   | get Muya Editor(marktext core editor),You can do more operations through the Muya editor(marktext core editor). |

### Example

```html
<template>
    <div>
        <vue-marktext 
            ref="marktextRef" 
            :markdown="'## Hi!'"
            :tabSize="2"/>
    </div>
</template>


<script setup>
import Muya from 'vue3-marktext/src/muya/lib/index';
import { onMounted,ref} from 'vue';
//component instance
const marktextRef = ref()

onMounted(()=>{
    //focus Editor
    marktextRef.value.focusEditor()
    //getMarkdown
    marktextRef.value.getMarkdown()
    //Muya Editor instance
    let editor = marktextRef.value.getEditor()
    
    
    if(editor instanceof Muya){
        //you can through Muya Editor to getMarkdown
        editor.getMarkdown();
       	//control editor to copy markdown As Html(Editor Behavior)
        editor.copyAsHtml()
    }
})

</script>
```

## Component Events

| event  | description                            | params        |
| ------ | -------------------------------------- | ------------- |
| change | When any state of Muya Editor changes. | (change: any) |



## Muya Editor

marktext：[marktext/marktext: 📝A simple and elegant markdown editor, available for Linux, macOS and Windows. (github.com)](https://github.com/marktext/marktext)

muya：[marktext/muya: Future markdown editor for web browser applications development (github.com)](https://github.com/marktext/muya)



