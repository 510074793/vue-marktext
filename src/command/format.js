import Muya from "../muya/lib"

const formatCommand = (muya, type) => {
    if (muya && type && muya instanceof Muya) {
        muya.format(type)
    }
}

export const clearFormat = muya => {
    formatCommand(muya, 'clear')
}

export const emphasis = muya => {
    formatCommand(muya, 'em')
}

export const highlight = muya => {
    formatCommand(muya, 'mark')
}

export const hyperlink = muya => {
    formatCommand(muya, 'link')
}

export const image = muya => {
    formatCommand(muya, 'image')
}

export const inlineCode = muya => {
    formatCommand(muya, 'inline_code')
}

export const inlineMath = muya => {
    formatCommand(muya, 'inline_math')
}

export const strikethrough = muya => {
    formatCommand(muya, 'del')
}

export const strong = muya => {
    formatCommand(muya, 'strong')
}

export const subscript = muya => {
    formatCommand(muya, 'sub')
}

export const superscript = muya => {
    formatCommand(muya, 'sup')
}

export const underline = muya => {
    formatCommand(muya, 'u')
}
