<!-- @format -->

<template>
  <div class="home">
    <div class="left">
      <div class="left-head">
        <el-popover placement="bottom-start" :width="160" trigger="click" v-model:visible="showHead">
          <template #reference>
            <img :src="headSrc" alt=" ">
          </template>
          <div class="head-box">
            <div @click="goHome">
              <el-icon>
                <User />
              </el-icon>
              个人中心
            </div>
            <div @click="exitBlog">
              <!-- <svg-icon name="exit" style="width: 14px;height: 14px;"></svg-icon> -->
              退出登录
            </div>
          </div>
        </el-popover>
      </div>
      <div class="left-add">
        <el-popover placement="bottom-start" :width="240" trigger="click" v-model:visible="showAdd">
          <template #reference>
            <el-button style="width: 100%; height: 36px; color: #ffffff" color="rgb(93, 139, 251)">新建
              <template #icon>
                <el-icon color="#FFFFFF" size="18">
                  <Plus />
                </el-icon>
              </template>
            </el-button>
          </template>
          <div class="add-box">
            <div class="folder-box" @click="addCategory">
              <div class="add-folder">
                <!-- <svg-icon name="addfolder" style="width: 20px; height: 20px"></svg-icon> -->
              </div>
              新建文件夹
            </div>
            <div class="folder-box" @click="addArticle">
              <div class="add-document">
                <div class="line1"></div>
                <div class="line2"></div>
              </div>
              空白文档
            </div>
          </div>
        </el-popover>
      </div>

      <div class="left-box">
        <div class="left-box-back" v-if="currentSelect.activate">
          <div class="box" @click="backClick">
            <el-icon>
              <ArrowLeft />
            </el-icon>
          </div>
          <div class="title">{{ currentSelect.title }}</div>
          <div class="box"></div>
        </div>

        <div v-for="(item, index) in treeData" :key="index" class="left-box-item"
          :class="[item.id == currentSelect.id ? 'left-box-item-select' : '']" @click="clickItem(item)" @click.stop
          @contextmenu="rightClick($event, item)">
          <div class="item-header">
          <!-- <div>图标</div> -->
            <!-- <svg-icon :name="item.type == 'category' ? 'folder' : 'document'"
                        style="width: 20px; height: 20px; margin-right: 10px"></svg-icon> -->

            <el-input v-if="item.rename" class="item-title" id="input" ref="inputr" v-model="item.name"
              @blur="renameClick"></el-input>
            <div v-else class="item-title">
              {{ item.name }}
            </div>

            <el-icon color="#a9b2c2">
              <MoreFilled />
            </el-icon>
          </div>
          <div class="item-footer">时间</div>
        </div>
      </div>
    </div>
    <div class="main" v-if="currentSelect.type == 'article'">
      <div class="tools">
        <el-input :border="false" v-model="articleData.title" style="flex: 1;"
          input-style="font-weight: 600;font-size:20px;letter-spacing: 1px;" @blur="saveTitle" @keydown.enter="saveTitle">
        </el-input>
        <div>
          <el-button @click="addCover" type="success">图片</el-button>
          <el-button @click="updateStatus" type="warning">{{
            articleData.status == 1 ? '已发布' : '待发布'
          }}</el-button>
          <el-button @click="saveArticle" type="primary">保存</el-button>
        </div>
      </div>
      <div id="sample">
        <vue-marktext style="width: 100%;" ref="myCom" :markdown="articleData.content" :textDirection="'left'"
          :tabSize="4" :imgPicker="imgPicker" @save="saveArticle" />
      </div>

    </div>
    <div v-else style="display: flex;justify-content: center;align-items: center;width: 100%;">
      <!-- <svg-icon name="folder1" style="width: 80px;height: 80px;"></svg-icon> -->
    </div>



    <el-dialog v-model="cover.show" width="400" title="设置封面图">
      <div style="margin-bottom: 10px;">
        <el-radio-group v-model="cover.type">
          <el-radio-button label="链接" />
          <el-radio-button label="上传" />
        </el-radio-group>
      </div>
      <div v-if="cover.type == '链接'" style="display: flex;gap: 10px;">
        <el-input v-model="cover.src" placeholder="请输入一个图片链接" />
        <el-button type="primary" @click="saveCover">确定</el-button>
      </div>
      <el-upload v-else class="upload-demo" drag action="https://img.clm.show/api/v1/upload" :limit="1"
        :show-file-list="false" :auto-upload="true" :on-success="onUploadSuccess" :on-error="onUploadError">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖放一张图片至此<em>浏览图像</em>
        </div>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>

export default {

  name: "Home"
}

</script>

<script setup>
import {
  categoryList,
  articleList,
  articleDetail,
  articleEdit,
  articleAdd,
  categoryAdd,
  categoryEdit,
  categoryDelete,
  articleDelete,
} from '@/api';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';

import { nextTick, onMounted, reactive, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { removeToken } from "@/util/cookies"
import { menusEvent } from 'vue3-menus';
import headSrc from "@/assets/images/head.png"
import { ElMessage } from "element-plus";
import Muya from '@/muya/lib/index';
import { openFileDialog } from "@/util";


const { appContext } = getCurrentInstance();

const router = useRouter();

const showAdd = ref(false);
const showHead = ref(false)
const myCom = ref()

const cover = reactive({
  show: false,
  src: "",
  type: "链接"
})

const treeData = ref([]);
const currentSelect = reactive({
  id: '', // 当前文档或目录的ID
  title: '', // 返回栏显示的标题
  name: '', // 当前文档或目录的名称
  pid: '00000000-0000-0000-0000-000000000000', //
  activate: false, // 是否显示返回栏
  type: '', // 当前选择的类型
  item: null, // 当前选择的item所有信息
});
const inputr = ref(null);

const onArticleChange = ref(false)

const articleData = reactive({
  id: '',
  content: '',
  title: '',
  status: 0,
  formatType: '',
  createTime: '',
  cover: '',
  categoryName: '',
  categoryId: '',
});

const menus = ref([
  {
    label: '重命名',
    // tip: 'Alt+向左箭头',
    click: () => {
      currentSelect.item.rename = true;
      nextTick(() => {
        if (inputr.value[0] != null) {
          inputr.value[0].focus();
        }
      });
    },
  },
  {
    label: '删除',
    // tip: '不关闭菜单',
    click: () => {
      if (currentSelect.type == 'category') {
        ElMessageBox.confirm(
          '删除内容将进入回收站。',
          '确认删除',
          {},
          appContext
        )
          .then(async (res) => {
            const ret = await categoryDelete({
              id: currentSelect.id,
              name: currentSelect.name,
              del: true,
            });
            console.log(ret);
            if (ret) {
              treeData.value = treeData.value.filter(function (item) {
                return item.id !== currentSelect.id;
              });
              if (treeData.value > 0) {
                currentSelect.type = treeData.value[0].type;
                currentSelect.id = treeData.value[0].id;
                if (currentSelect.type == 'article') {
                  getArticleDetail(treeData.value[0]);
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        ElMessageBox.confirm(
          '删除内容将进入回收站。',
          '确认删除',
          {},
          appContext
        )
          .then(async (res) => {
            const ret = await articleDelete({ id: currentSelect.id });
            console.log(ret);
            if (ret) {
              treeData.value = treeData.value.filter(function (item) {
                return item.id !== currentSelect.id;
              });

              if (treeData.value > 0) {
                currentSelect.type = treeData.value[0].type;
                currentSelect.id = treeData.value[0].id;
                if (currentSelect.type == 'article') {
                  getArticleDetail(treeData.value[0]);
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
]);

const rightClick = (event, item) => {
  currentSelect.type = item.type;
  currentSelect.id = item.id;
  currentSelect.item = item;

  currentSelect.name = item.name;
  if (item.type != 'category') {
    getArticleDetail(item);
  }
  menusEvent(event, menus.value);
  event.preventDefault();
};

const renameClick = async () => {
  currentSelect.item.rename = false;
  if (currentSelect.name != currentSelect.item.name) {
    if (currentSelect.type == 'category') {
      const res = await categoryEdit({
        id: currentSelect.id,
        name: currentSelect.item.name,
      });
      if (!res) {
        currentSelect.item.name = currentSelect.name;
      } else {
        currentSelect.name = currentSelect.item.name;
      }
    } else {
      const res = await articleEdit({
        id: currentSelect.id,
        title: currentSelect.item.name,
      });
      if (!res) {
        currentSelect.item.name = currentSelect.name;
      } else {
        currentSelect.name = currentSelect.item.name;
        articleData.title = currentSelect.name;
      }
    }
  }
};

const clickTimes = ref(0); //记录点击次数

const clickItem = (item) => {
  clickTimes.value++;

  if (clickTimes.value === 2) {
    clickTimes.value = 0;
    //  处理双击事件...
    currentSelect.type = item.type;
    currentSelect.id = item.id;
    currentSelect.item = item
    if (item.type == 'category') {
      currentSelect.pid = item.id;
      currentSelect.title = item.name;
      currentSelect.activate = true;
      doubleClick(item);
    } else {
      currentSelect.name = item.name;
      getArticleDetail(item);
    }
  }
  setTimeout(function () {
    if (clickTimes.value === 1) {
      currentSelect.item = item
      clickTimes.value = 0;
      //  处理单击事件...
      currentSelect.type = item.type;
      currentSelect.id = item.id;
      currentSelect.name = item.name;
      if (item.type == 'category') {
        // currentSelect.title = item.name
      } else {
        getArticleDetail(item);
      }
    }
  }, 250);
};

const doubleClick = async (item) => {
  // 获取下级目录 和 文章
  console.log(JSON.stringify(item));
  let cid;
  if (item.id != '') {
    cid = {
      cId: item.id,
    };
  }
  let children = [];
  const category = await categoryList(cid);
  category.forEach((element) => {
    children.push({
      type: 'category',
      name: element.name,
      id: element.id,
      rename: false,
    });
  });

  if (item.id != '') {
    const article = await articleList({ cId: item.id, size: 10000 });
    article.data.forEach((element) => {
      children.push({
        type: 'article',
        name: element.title,
        id: element.id,
        rename: false,
      });
    });
  }

  if (children.length > 0) {
    currentSelect.type = children[0].type;
    currentSelect.id = children[0].id;
    currentSelect.name = children[0].name;
    if (currentSelect.type == 'article') {
      getArticleDetail(children[0]);
    }
  }

  treeData.value = children;
};

const backClick = async () => {
  let children = [];

  let cid;
  if (currentSelect.pid != '') {
    cid = {
      cId: currentSelect.pid,
      parent: true,
    };
  }

  const category = await categoryList(cid);
  category.forEach((element) => {
    currentSelect.pid = element.pId;
    currentSelect.title = element.pName;

    children.push({
      type: 'category',
      name: element.name,
      id: element.id,
      rename: false,
    });
  });

  if (currentSelect.pid == '00000000-0000-0000-0000-000000000000') {
    currentSelect.activate = false;
  }

  if (currentSelect.pid != '') {
    const article = await articleList({ cId: currentSelect.pid, size: 10000 });
    article.data.forEach((element) => {
      children.push({
        type: 'article',
        name: element.title,
        id: element.id,
        rename: false,
      });
    });
  }

  if (children.length > 0) {
    currentSelect.type = children[0].type;
    currentSelect.id = children[0].id;
    if (currentSelect.type == 'article') {
      getArticleDetail(children[0]);
    }
  }

  treeData.value = children;
};

const getArticleDetail = async (item) => {
  const detail = await articleDetail(item.id);
  console.log(detail);
  articleData.id = detail.id;
  articleData.content = detail.content;
  articleData.title = detail.title;
  articleData.status = detail.status;
  articleData.formatType = detail.formatType;
  articleData.createTime = detail.createTime;
  articleData.cover = detail.cover;
  articleData.categoryName = detail.categoryName;
  articleData.categoryId = detail.categoryId;
};

const getCategoryData = async () => {
  let cid;
  if (currentSelect.pid != '') {
    cid = {
      cId: currentSelect.pid,
    };
  }
  let children = [];
  const category = await categoryList(cid);
  category.forEach((element) => {
    children.push({
      type: 'category',
      name: element.name,
      id: element.id,
      rename: false,
    });
  });

  const article = await articleList({
    cId: '00000000-0000-0000-0000-000000000000',
    size: 10000,
  });
  article.data.forEach((element) => {
    children.push({
      type: 'article',
      name: element.title,
      id: element.id,
      rename: false,
    });
  });

  if (children.length > 0) {
    currentSelect.type = children[0].type;
    currentSelect.id = children[0].id;
    if (currentSelect.type == 'article') {
      getArticleDetail(children[0]);
    }
  }

  children.sort((a, b) => {
    if (a.type > b.type) {
      return -1;
    } else {
      return 1;
    }
  });

  treeData.value = children;
};

const updateStatus = async () => {
  let status = articleData.status == 0 ? 1 : 0;
  const res = await articleEdit({
    id: articleData.id,
    status: status,
  });
  if (res) {
    articleData.status = status;
  }
  console.log(res);
};

const saveTitle = async () => {
  const res = await articleEdit({
    id: articleData.id,
    title: articleData.title,
  });
  if (res) {
    currentSelect.item.name = articleData.title
  } else {
    articleData.title = currentSelect.item.name
  }
}

const saveArticle = async () => {
  onSave(myCom.value.getMarkdown())
};

const addArticle = async () => {
  showAdd.value = false;
  let data = {
    title: '新建文档',
  };
  if (currentSelect.pid != '') {
    data['cId'] = currentSelect.pid;
  }

  const articleId = await articleAdd(data);

  treeData.value.push({
    type: 'article',
    name: '新建文档',
    id: articleId,
    rename: true,
  });

  currentSelect.id = articleId;
  currentSelect.name = '新建文档';
  currentSelect.type = 'article';

  articleData.title = currentSelect.name;
  articleData.status = 0;
  articleData.id = currentSelect.id;

  articleData.content = '';
  articleData.status = '';
  articleData.formatType = '';
  articleData.createTime = '';
  articleData.cover = '';
  articleData.categoryName = '';
  articleData.categoryId = '';

  //getArticleDetail()

  currentSelect.item = treeData.value[treeData.value.length - 1];

  nextTick(() => {
    if (inputr.value[0] != null) {
      inputr.value[0].focus();
    }
  });
};

const addCategory = async () => {
  showAdd.value = false;
  let categoryName = '新建文件夹';
  let data = treeData.value;
  let i = 1;
  while (true) {
    let d = data.filter((e) => {
      if (e.name == categoryName) {
        categoryName = categoryName + '(' + i + ')';
        return true;
      }
    });
    if (d.length == 0) {
      break;
    }
    i++;
  }
  const categoryId = await categoryAdd({
    id: '00000000-0000-0000-0000-000000000000',
    name: categoryName,
    cover: 'default.jpg',
    pId: currentSelect.pid,
  });
  treeData.value.push({
    type: 'category',
    name: categoryName,
    id: categoryId,
    rename: true,
  });

  currentSelect.id = categoryId;
  currentSelect.name = categoryName;
  currentSelect.type = 'category';
  currentSelect.item = treeData.value[treeData.value.length - 1];
  treeData.value.sort((a, b) => {
    if (a.type > b.type) {
      return -1;
    } else {
      return 1;
    }
  });

  nextTick(() => {
    if (inputr.value[0] != null) {
      inputr.value[0].focus();
    }
  });
};

const imgPicker = async () => {
  const fileData = await openFileDialog('image/*', true, 300, false, false, "选择图片")
  if (fileData) {
    const url = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'https://img.clm.show/api/v1/upload');
      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json) {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }
        if (json.status == false) {
          reject(json.message);
          return;
        }
        console.log(json);
        resolve(json.data.links.url);
      };

      xhr.onerror = () => {
        reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      const formData = new FormData();
      formData.append('file', fileData[0]);

      xhr.send(formData);
    })

    return url
  }

  return ''
}


const onSave = async (v) => {
  const res = await articleEdit({
    id: articleData.id,
    content: v,
    format: 'markdown'
  });
  if (res) {
    ElMessage.success("已保存")
  }
}

const addCover = () => {
  // 本地上传，直接放链接，裁剪上传
  cover.show = true
}

const onUploadSuccess = async (e) => {
  cover.src = e.data.links.url
  cover.show = false
  saveCover()
}
const onUploadError = () => {
  cover.src = ''
}

const saveCover = async () => {
  cover.show = false
  const res = await articleEdit({
    id: articleData.id,
    cover: cover.src
  });
  if (res) {
    ElMessage.success("设置成功")
  }
}

const goHome = () => {
  showHead.value = false
  window.open('https://clm.show', '_blank');
}

const exitBlog = () => {
  removeToken()
  router.push({ 'path': '/index' })
}

onMounted(() => {
 
  getCategoryData();
});
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
    height: 100%;
  }
}

.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  min-height: 100%;
  display: flex;
  flex-direction: row;

  .left {
    min-width: 290px;
    max-width: 290px;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    min-height: 100vh;
    background: #ffffff;
    user-select: none;
    -webkit-user-drag: none;

    &-head {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;

      img {
        height: 70px;
        width: 70px;
        border: none;
        border-radius: 50%;
        user-select: none;
        -webkit-user-drag: none;


      }
    }

    &-add {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 30px;
    }

    &-box {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      cursor: default;

      &-back {
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 24px;
        align-items: center;
        margin-bottom: 10px;

        .box {
          min-width: 30px;
          text-align: center;
          font-size: 14px;
        }

        .title {
          flex: 1;
          text-align: center;
          opacity: 0.8;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #232d47;
          // margin: 0 55px;
        }
      }

      &-item {
        display: flex;
        flex-direction: column;
        // width: 100%;
        border-bottom: 1px solid #f0f3f5;
        padding: 13px 8px;
        gap: 4px;

        .item-header {
          display: flex;
          flex-direction: row;

          .item-title {
            color: #232d47;
            font-size: 13px;
            flex: 1;
            font-weight: 500;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
            padding-right: 10px;
          }
        }

        .item-footer {
          width: 100%;
          text-align: left;
          color: #a9b2c2;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 20px;
          font-size: 12px;
        }
      }

      &-item-select {
        background-color: rgb(244, 246, 247);
        border-radius: 10px;
        border-bottom: 1px solid #ffffff;
      }

      &-item:hover {
        border-bottom: 1px solid #ffffff;
        background-color: rgb(244, 246, 247);
        border-radius: 10px;
      }
    }
  }

  .main {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
  }

  .tools {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 20px;
  }

  :deep(.tools) {
    .el-input {
      .el-input__wrapper {
        box-shadow: none !important;
      }
    }
  }

  .detail-editor {
    flex: 1;
  }
}

.add-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: default;
  user-select: none;
  -webkit-user-drag: none;

  .folder-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    height: 72px;
    width: 72px;

    .add-folder {
      background-color: #fcb951;
      width: 30px;
      height: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
    }

    .add-document {
      display: flex;
      flex-direction: column;
      width: 30px;
      height: 30px;
      border-radius: 6px;
      background-color: rgb(102, 145, 252);
      justify-content: center;
      padding: 6px;
      box-sizing: border-box;
      gap: 6px;

      .line1 {
        max-width: 14px;
        min-width: 14px;
        min-height: 2px;
        background: #ebeaea;
      }

      .line2 {
        max-width: 9px;
        min-width: 9px;
        min-height: 2px;
        background: #dbdada;
      }
    }
  }

  .folder-box:hover {
    background-color: rgb(240, 243, 245);
  }
}

.tools-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: default;

  .tools-item {
    text-align: center;
    padding: 10px;
  }
}

.head-box {
  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: default;
  }
}

#sample {
  width: 100%;
  box-sizing: border-box;
  min-width: 460px;
  height: 100%;
  border: 1px solid #DDD;
}
</style>
