
/**
 * markText defaultKeyMap
 */
export const defaultKeyMap = new Map([
    // Edit menu
    ['edit.undo', 'Ctrl+Z'],
    ['edit.redo', 'Ctrl+Shift+Z'],
    //['edit.cut', 'Ctrl+X'],
    //['edit.copy', 'Ctrl+C'],
    //['edit.paste', 'Ctrl+V'],
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
    ['paragraph.front-matter', 'Ctrl+Alt+Y'],

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

])


export class MuyaKeybinder {

    constructor() {
        this.defaultKeyMap = defaultKeyMap
        this.__editKeybinder = new EditKeybinder(this)
        this.__formatKeybinder = new FormatKeybinder(this)
        this.__paragraphKeybinder = new ParagraphKeybinder(this)
    }

    edit() {
        return this.__editKeybinder
    }

    format() {
        return this.__formatKeybinder
    }

    paragraph() {
        return this.__paragraphKeybinder
    }

    findCommand(event) {
        let searchKey = []
        if (event.ctrlKey) {
            searchKey.push('ctrl')
        }

        if (event.shiftKey) {
            searchKey.push('shift')
        }

        if (event.altKey) {
            searchKey.push('alt')
        }

        if(event.key == "+"){
            searchKey.push("plus")
        }else{
            searchKey.push(event.key.toLocaleLowerCase())
        }
        searchKey = searchKey.sort()

        for (let [command, matchKey] of this.defaultKeyMap) {
            let keys = matchKey.toLocaleLowerCase().split('+').sort()
            if (searchKey.toString() == keys.toString()) {
                return command
            }
        }
        return null
    }



}

class EditKeybinder {
    constructor(muyaKeybinder) {
        this.muyaKeybinder = muyaKeybinder
        this.defaultKeyMap = muyaKeybinder.defaultKeyMap
    }

    undo(key) {
        this.configKey(key, "undo")
    }

    redo(key) {
        this.configKey(key, "redo")
    }

    cut(key) {
        this.configKey(key, "cut")
    }

    copy(key) {
        this.configKey(key, "copy")
    }

    paste(key) {
        this.configKey(key, "paste")
    }

    copyAsMarkdown() {
        this.configKey(key, "copy-as-markdown")
    }

    copyAsHtml() {
        this.configKey(key, "copy-as-html")
    }

    pasteAsPlaintext() {
        this.configKey(key, "paste-as-plaintext")
    }

    selectAll() {
        this.configKey(key, "select-all")
    }
    duplicate() {
        this.configKey(key, "duplicate")
    }

    createParagraph() {
        this.configKey(key, "create-paragraph")
    }

    deleteParagraph() {
        this.configKey(key, "delete-paragraph")
    }

    find() {
        this.configKey(key, "find")
    }

    findNext() {
        this.configKey(key, "find-next")
    }

    configKey(key, type) {
        if (!key || !type) return
        this.defaultKeyMap[`edit.${type}`] = key
    }

    end() {
        return this.muyaKeybinder
    }
}

class FormatKeybinder {
    constructor(muyaKeybinder) {
        this.muyaKeybinder = muyaKeybinder
        this.defaultKeyMap = muyaKeybinder.defaultKeyMap
    }

    strong(key) {
        this.configKey(key, "strong")
    }

    emphasis(key) {
        this.configKey(key, "emphasis")
    }

    underline(key) {
        this.configKey(key, "underline")
    }

    highlight(key) {
        this.configKey(key, "highlight")
    }

    inlineCode(key) {
        this.configKey(key, "inline-code")
    }

    inlineMath(key) {
        this.configKey(key, "inline-math")
    }

    strike(key) {
        this.configKey(key, "strike")
    }

    hyperlink(key) {
        this.configKey(key, "hyperlink")
    }

    image(key) {
        this.configKey(key, "image")
    }

    clearFormat(key) {
        this.configKey(key, "clear-format")
    }

    configKey(key, type) {
        if (!key || !type) return
        this.defaultKeyMap[`format.${type}`] = key
    }

    end() {
        return this.muyaKeybinder
    }

}

class ParagraphKeybinder {
    constructor(muyaKeybinder) {
        this.muyaKeybinder = muyaKeybinder
        this.defaultKeyMap = muyaKeybinder.defaultKeyMap
    }


}