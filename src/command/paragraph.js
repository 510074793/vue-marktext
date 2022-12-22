const transformEditorElement = (muya, type) => {
    if (type === 'table') {
        muya.createTable({rows:3,columns:4})
    } else if (muya) {
        muya.updateParagraph(type)
    }
}


export const bulletList = muya => {
    transformEditorElement(muya, 'ul-bullet')
}

export const codeFence = muya => {
    transformEditorElement(muya, 'pre')
}

export const degradeHeading = muya => {
    transformEditorElement(muya, 'degrade heading')
}

export const frontMatter = muya => {
    transformEditorElement(muya, 'front-matter')
}

export const heading1 = muya => {
    transformEditorElement(muya, 'heading 1')
}

export const heading2 = muya => {
    transformEditorElement(muya, 'heading 2')
}

export const heading3 = muya => {
    transformEditorElement(muya, 'heading 3')
}

export const heading4 = muya => {
    transformEditorElement(muya, 'heading 4')
}

export const heading5 = muya => {
    transformEditorElement(muya, 'heading 5')
}

export const heading6 = muya => {
    transformEditorElement(muya, 'heading 6')
}

export const horizontalLine = muya => {
    transformEditorElement(muya, 'hr')
}

export const htmlBlock = muya => {
    transformEditorElement(muya, 'html')
}

export const looseListItem = muya => {
    transformEditorElement(muya, 'loose-list-item')
}

export const mathFormula = muya => {
    transformEditorElement(muya, 'mathblock')
}

export const orderedList = muya => {
    transformEditorElement(muya, 'ol-order')
}

export const paragraph = muya => {
    transformEditorElement(muya, 'paragraph')
}

export const quoteBlock = muya => {
    transformEditorElement(muya, 'blockquote')
}

export const table = muya => {
    transformEditorElement(muya, 'table')
}

export const taskList = muya => {
    transformEditorElement(muya, 'ul-task')
}

export const increaseHeading = muya => {
    transformEditorElement(muya, 'upgrade heading')
}
