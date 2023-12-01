import dayjs from "dayjs"

export const delay = time => {
  let timerId
  let rejectFn
  const p = new Promise((resolve, reject) => {
    rejectFn = reject
    timerId = setTimeout(() => {
      p.cancel = () => {}
      rejectFn = null
      resolve()
    }, time)
  })

  p.cancel = () => {
    clearTimeout(timerId)
    timerId = null
    rejectFn()
    rejectFn = null
  }
  return p
}

const ID_PREFEX = 'mt-'
let id = 0

export const serialize = function (params) {
  return Object.keys(params).map(key => `${key}=${encodeURI(params[key])}`).join('&')
}

export const merge = function (...args) {
  return Object.assign({}, ...args)
}

export const dataURItoBlob = function (dataURI) {
  const data = dataURI.split(';base64,')
  const byte = window.atob(data[1])
  const mime = data[0].split(':')[1]
  const ab = new ArrayBuffer(byte.length)
  const ia = new Uint8Array(ab)
  const len = byte.length
  let i
  for (i = 0; i < len; i++) {
    ia[i] = byte.charCodeAt(i)
  }
  return new window.Blob([ab], { type: mime })
}

export const adjustCursor = (cursor, preline, line, nextline) => {
  let newCursor = Object.assign({}, { line: cursor.line, ch: cursor.ch })
  // It's need to adjust the cursor when cursor is at begin or end in table row.
  if (/\|[^|]+\|.+\|\s*$/.test(line)) {
    if (/\|\s*:?-+:?\s*\|[:-\s|]+\|\s*$/.test(line)) { // cursor in `| --- | :---: |` :the second line of table
      newCursor.line += 1 // reset the cursor to the next line
      newCursor.ch = nextline.indexOf('|') + 1
    } else { // cursor is not at the second line to table
      if (cursor.ch <= line.indexOf('|')) newCursor.ch = line.indexOf('|') + 1
      if (cursor.ch >= line.lastIndexOf('|')) newCursor.ch = line.lastIndexOf('|') - 1
    }
  }

  // Need to adjust the cursor when cursor in the first or last line of code/math block.
  if (/```[\S]*/.test(line) || /^\$\$$/.test(line)) {
    if (typeof nextline === 'string' && /\S/.test(nextline)) {
      newCursor.line += 1
      newCursor.ch = 0
    } else if (typeof preline === 'string' && /\S/.test(preline)) {
      newCursor.line -= 1
      newCursor.ch = preline.length
    }
  }

  // Need to adjust the cursor when cursor at the begin of the list
  if (/[*+-]\s.+/.test(line) && newCursor.ch <= 1) {
    newCursor.ch = 2
  }

  // Need to adjust the cursor when cursor at blank line or in a line contains HTML tag.
  // set the newCursor to null, the new cursor will at the last line of document.
  if (!/\S/.test(line) || /<\/?([a-zA-Z\d-]+)(?=\s|>).*>/.test(line)) {
    newCursor = null
  }
  return newCursor
}

export const animatedScrollTo = function (element, to, duration, callback) {
  const start = element.scrollTop
  const change = to - start
  const animationStart = +new Date()

  // Prevent animation on small steps or duration is 0
  if (Math.abs(change) <= 6 || duration === 0) {
    element.scrollTop = to
    return
  }

  const easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  const animateScroll = function () {
    const now = +new Date()
    const val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration))

    element.scrollTop = val

    if (now > animationStart + duration) {
      element.scrollTop = to
      if (callback) {
        callback()
      }
    } else {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

export const getUniqueId = () => {
  return `${ID_PREFEX}${id++}`
}

export const hasKeys = obj => Object.keys(obj).length > 0

/**
 * Clone an object as a shallow or deep copy.
 *
 * @param {*} obj Object to clone
 * @param {Boolean} deepCopy Create a shallow (false) or deep copy (true)
 * @deprecated Use `cloneObject` (shallow copy) or `deepClone` (deep copy).
 */
export const cloneObj = (obj, deepCopy = true) => {
  return deepCopy ? JSON.parse(JSON.stringify(obj)) : Object.assign({}, obj)
}

/**
 * Shallow clone the given object.
 *
 * @param {*} obj Object to clone
 * @param {boolean} inheritFromObject Whether the clone should inherit from `Object`
 */
export const cloneObject = (obj, inheritFromObject = true) => {
  return Object.assign(inheritFromObject ? {} : Object.create(null), obj)
}

/**
 * Deep clone the given object.
 *
 * @param {*} obj Object to clone
 */
export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj))
}



/** 格式化时间 */
export const formatDateTime = (time) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A"
}

/** 格式化时间 */
export const formatDate = (time) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD") : "N/A"
}

/** 判断时间格式  YYYY-MM-DD */
export const checkDate = (dateStr) => {
  let a = /^(\d{4})-(\d{2})-(\d{2})$/
  if (!a.test(dateStr)) {
    return false
  } else {
    return true
  }
}

/** 判断当前时间是否  */
export const diffTime = (time) => {
	if (!checkDate(time)) {
		return false
	}
	const current = dayjs()
	const t = dayjs(time).diff(current, "minute")
	if (t < 10) {
		return false
	}
	return true
}

/**
 * 打开文件夹
 */
export async function openFileDialog(
  {
    accept = 'image/*',
    compatible = true,
    cancel = 300,
    multiple,
    webkitdirectory,
    description
  }
) {
  accept.constructor === Array && (accept = accept.join(","));
  // 实验性功能
  if (!compatible && window.hasOwnProperty("showOpenFilePicker")) {
    console.warn("Note that showOpenFilePicker is an experimental interface and is not supported by most browsers, so use it sparingly.");
    const files = [];
    const acceptMap = {};
    for (let a of (accept).split(",")) {
      acceptMap[a] = [];
    }
    //@ts-ignore
    const fileHandleList = await window.showOpenFilePicker?.({
      multiple,
      excludeAcceptAllOption: false,
      types: [{
        description,
        accept: acceptMap
      }]
    });
    for (const f of fileHandleList) {
      files.push(await f.getFile());
    }
    return files;
  }

  const inpEle = document.createElement("input");
  inpEle.id = `__file_${Math.trunc(Math.random() * 100000)}`;
  inpEle.type = "file";
  inpEle.style.display = "none";
  // 文件类型限制
  inpEle.accept = accept;
  // 多选限制
  multiple && (inpEle.multiple = multiple);
  // 选择目录限制
  if (webkitdirectory) {
    console.warn("该特性是非标准的，请尽量不要在生产环境中使用它！\n"
      + "This feature is non-standard, so try not to use it in a production environment!");
    inpEle.webkitdirectory = webkitdirectory;
  }
  inpEle.click();

  return await new Promise((resolve, reject) => {
    let _isSelected = false;
    const changeEvent = () => {
      const files = inpEle.files;
      if (files) {
        _isSelected = true;
        resolve(Array.from(files));
      }
    };
    const focusEvent = (event) => {
      if (event.target?.constructor === Window) {
        setTimeout(() => {
          !_isSelected && reject("未选定文件\nUnselected file");
        }, cancel);
      }
    };
    inpEle.addEventListener("change", changeEvent, { once: true });
    cancel && window.addEventListener("focus", focusEvent, { once: true });
  });
}