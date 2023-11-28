<script setup>
import FormatStrong from '../muya/lib/assets/icons/format_strong.svg'
import FormatUnderline from '../muya/lib/assets/icons/format_underline.svg'
import FormatEmphasis from '../muya/lib/assets/icons/format_emphasis.svg'
import FormatStrike from '../muya/lib/assets/icons/format_strike.svg'
import FormatCode from '../muya/lib/assets/icons/code.svg'
import FormatMath from '../muya/lib/assets/icons/format_math.svg'
import FormatLink from '../muya/lib/assets/icons/format_link.svg'
import FormatImage from '../muya/lib/assets/icons/format_image.svg'

//paragraph function icon
import Header1 from '../muya/lib/assets/icons/header_1.svg'
import Header2 from '../muya/lib/assets/icons/header_2.svg'
import Header3 from '../muya/lib/assets/icons/header_3.svg'
import Header4 from '../muya/lib/assets/icons/header_4.svg'
import Header5 from '../muya/lib/assets/icons/header_5.svg'
import Header6 from '../muya/lib/assets/icons/header_6.svg'
import OrderList from '../muya/lib/assets/icons/order_list.svg'
import BulletList from '../muya/lib/assets/icons/bullet_list.svg'
import Table from '../muya/lib/assets/icons/table.svg'
import Code from '../muya/lib/assets/icons/code.svg'
import MathIcon from '../muya/lib/assets/icons/math.svg'
import Quote from '../muya/lib/assets/icons/quote.svg'
import Html from '../muya/lib/assets/icons/html.svg'
import HorizontalLine from '../muya/lib/assets/icons/horizontal_line.svg'
import Paragraph from '../muya/lib/assets/icons/paragraph.svg'

//export function icon
import Save from '@/icons/svg/save.svg'


const props = defineProps()
const emit = defineEmits(['format', 'paragraph', 'export', 'save'])

const format = (type) => {
    emit('format', { type })
}

const paragraph = (type) => {
    emit('paragraph', { type })
}

const toExports = () => {
    emit('export')
}

const toSave = () => {
    emit('save', { type: 'styledHTML' })
}

</script>

<template>
    <div class="__wapper-editor-tool-bar">
        <ul class="format-tool">
            <li @click="format('strong')" title="strong">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatStrong.id" />
                </svg>
            </li>
            <li @click="format('underline')" title="underline">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatUnderline.id" />
                </svg>
            </li>
            <li @click="format('emphasis')" title="emphasis">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatEmphasis.id" />
                </svg>
            </li>
            <li @click="format('strike')" title="delete-line">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatStrike.id" />
                </svg>
            </li>
            <li @click="format('inline-code')" title="inline-code">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatCode.id" />
                </svg>
            </li>
            <li @click="format('inline-math')" title="inline-math">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatMath.id" />
                </svg>
            </li>
            <li @click="format('hyperlink')" title="hyperlink">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatLink.id" />
                </svg>
            </li>
            <li @click="format('image')" title="image">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + FormatImage.id" />
                </svg>
            </li>
        </ul>
        <ul class="paragraph-tool">
            <li @click="paragraph('table')" title="table">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Table.id" />
                </svg>
            </li>
            <li @click="paragraph('quote-block')" title="quote-block">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Quote.id" />
                </svg>
            </li>
            <li @click="paragraph('html-block')" title="html-block">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Html.id" />
                </svg>
            </li>
            <li @click="paragraph('code-fence')" title="code-fence">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Code.id" />
                </svg>
            </li>
            <li @click="paragraph('math-formula')" title="math-formula">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + MathIcon.id" />
                </svg>
            </li>
            <li @click="paragraph('bullet-list')" title="bullet-list">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + BulletList.id" />
                </svg>
            </li>
            <li @click="paragraph('order-list')" title="order-list">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + OrderList.id" />
                </svg>
            </li>
            <li @click="paragraph('horizontal-line')" title="horizontal-line">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + HorizontalLine.id" />
                </svg>
            </li>
            <li @click="paragraph('paragraph')" title="clear-format">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Paragraph.id" />
                </svg>
            </li>
            <li @click="paragraph('heading-1')" title="H1">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Header1.id" />
                </svg>
            </li>
            <li @click="paragraph('heading-2')" title="H2">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Header2.id" />
                </svg>
            </li>
            <li @click="paragraph('heading-3')" title="H3">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Header3.id" />
                </svg>
            </li>
            <li @click="paragraph('heading-4')" title="H4">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Header4.id" />
                </svg>
            </li>
            <li @click="paragraph('heading-5')" title="H5">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Header5.id" />
                </svg>
            </li>
            <li @click="paragraph('heading-6')" title="H6">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Header6.id" />
                </svg>
            </li>
            <li class="__download" @click="toExports" title="save">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Save.id" />
                </svg>
            </li>
            <!-- <li class="__save" @click="toSave" title="export Html File">
                <svg aria-hidden="true">
                    <use :xlink:href="'#' + Save.id" />
                </svg>
            </li> -->
        </ul>
    </div>
</template>

<style scoped>
.__wapper-editor-tool-bar {
    min-width: 400px;
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
    /* box-shadow: 0 0px 3px 1px #ddd; */
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
}

.__wapper-editor-tool-bar ul {
    padding-left: 0px;
    display: flex;
}

.__download {
    justify-content: flex-end;
    margin-left: auto;
}

.__save {
    justify-content: flex-end;
    margin-left: auto;
}

ul li {
    list-style: none;
    /*border: 1px solid #dcdfe6;*/
    height: 24px;
    user-select: none;
}

ul li svg {
    height: 20px;
    width: 20px;
    margin: 2px 4px;
    fill: currentColor;
    color: var(--iconColor);
    stroke-width: 2px
}

ul li:hover {
    background: #ddd;
    border-radius: 4px;
}
</style>