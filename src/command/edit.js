import Muya from "../muya/lib"



export const editorUndo = muya => {
    if (muya && muya instanceof Muya) {
        muya.undo()
    }
}

export const editorRedo = muya => {
    if (muya && muya instanceof Muya) {
        muya.redo()
    }
}

export const editorCopyAsMarkdown = muya => {
    if (muya && muya instanceof Muya) {
        muya.copyAsMarkdown()
    }
}

export const editorCopyAsHtml = muya => {
    if (muya && muya instanceof Muya) {
        muya.copyAsHtml()
    }
}

export const editorPasteAsPlainText = muya => {
    if (muya && muya instanceof Muya) {
        muya.pasteAsPlainText()
    }
}

export const editorSelectAll = muya => {
    if (muya && muya instanceof Muya) {
        muya.selectAll()
    }
}

export const editorDuplicate = muya => {
    if (muya && muya instanceof Muya) {
        muya.deleteParagraph()
    }
}

export const editorCreateParagraph = muya => {
    if (muya && muya instanceof Muya) {
        muya.insertParagraph('after', '', true)
    }
}

export const editorDeleteParagraph = muya => {
    if (muya && muya instanceof Muya) {
        muya.deleteParagraph()
    }
}

export const editorFind = (muya, value, opt, index) => {
    if (muya && muya instanceof Muya) {
        let searchMatchs = muya.search(value, opt, index)
    }
}

export const editorFindNext = muya => {
    editCommand(muya, 'findNext')
}

export const editorFindPrevious = muya => {
    editCommand(muya, 'findPrev')
}

export const editorReplace = muya => {
    editCommand(muya, 'undo')
}



export const nativeCut = muya => {

}

export const nativeCopy = muya => {

}

export const nativePaste = muya => {
    
}