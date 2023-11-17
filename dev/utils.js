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