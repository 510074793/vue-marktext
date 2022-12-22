import {
    editorUndo,
    editorRedo,
    nativeCut,
    nativeCopy,
    nativePaste,
    editorCopyAsMarkdown,
    editorCopyAsHtml,
    editorPasteAsPlainText,
    editorSelectAll,
    editorDuplicate,
    editorCreateParagraph,
    editorDeleteParagraph,
    editorFind,
    editorFindNext,
    editorFindPrevious,
    editorReplace
} from './edit'
import {
    strong,
    emphasis,
    underline,
    highlight,
    inlineCode,
    inlineMath,
    strikethrough,
    hyperlink,
    image,
    clearFormat
} from './format'
import {
    heading1,
    heading2,
    heading3,
    heading4,
    heading5,
    heading6,
    increaseHeading,
    degradeHeading,
    table,
    taskList,
    paragraph,
    horizontalLine,
    htmlBlock,
    bulletList,
    orderedList,
    codeFence,
    frontMatter,
    quoteBlock,
    mathFormula,
    looseListItem
} from './paragraph'



let defaultCommandMap = new Map([
    // Edit menu
    ['edit.undo', editorUndo],
    ['edit.redo', editorRedo],
    //['edit.cut', nativeCut],
    //['edit.copy', nativeCopy],
    //['edit.paste', nativePaste],
    ['edit.copy-as-markdown', editorCopyAsMarkdown],
    ['edit.copy-as-html', editorCopyAsHtml],
    ['edit.paste-as-plaintext', editorPasteAsPlainText],
    ['edit.select-all', editorSelectAll],
    ['edit.duplicate', editorDuplicate],
    ['edit.create-paragraph', editorCreateParagraph],
    ['edit.delete-paragraph', editorDeleteParagraph],
    ['edit.find', editorFind],
    ['edit.find-next', editorFindNext],
    ['edit.find-previous', editorFindPrevious],
    ['edit.replace', editorReplace],

    // Paragraph menu
    // NOTE: We cannot set a default value for heading size because `Ctrl+Alt` is an alias
    //       to `AltGr` on Windows and `Ctrl+Shift+1` is mapped to the underlying character.
    ['paragraph.heading-1', heading1],
    ['paragraph.heading-2', heading2],
    ['paragraph.heading-3', heading3],
    ['paragraph.heading-4', heading4],
    ['paragraph.heading-5', heading5],
    ['paragraph.heading-6', heading6],
    ['paragraph.upgrade-heading', increaseHeading],
    ['paragraph.degrade-heading', degradeHeading],
    ['paragraph.table', table],
    ['paragraph.code-fence', codeFence],
    ['paragraph.quote-block', quoteBlock],
    ['paragraph.math-formula', mathFormula],
    ['paragraph.html-block', htmlBlock],
    ['paragraph.order-list', orderedList],
    ['paragraph.bullet-list', bulletList],
    ['paragraph.task-list', taskList],
    ['paragraph.loose-list-item', looseListItem],
    ['paragraph.paragraph', paragraph],
    ['paragraph.horizontal-line', horizontalLine],
    ['paragraph.front-matter', frontMatter],

    // Format menu
    ['format.strong', strong],
    ['format.emphasis', emphasis],
    ['format.underline', underline],
    ['format.highlight', highlight],
    ['format.inline-code', inlineCode],
    ['format.inline-math', inlineMath],
    ['format.strike', strikethrough],
    ['format.hyperlink', hyperlink],
    ['format.image', image],
    ['format.clear-format', clearFormat],
])


export class CommandManager {
    constructor(muya) {
        this._commands = defaultCommandMap
        this._muya = muya
    }

    add(id, callback) {
        const { _commands } = this
        if (_commands.has(id)) {
            throw new Error(`Command with id="${id}" already exists.`)
        }
        _commands.set(id, callback)
    }

    remove(id) {
        return this._commands.delete(id)
    }

    has(id) {
        return this._commands.has(id)
    }

    execute(id, ...args) {
        const command = this._commands.get(id)
        if (!command) {
            throw new Error(`No command found with id="${id}".`)
        }
        return command(...args)
    }

}




