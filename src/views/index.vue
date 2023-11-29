<template>
  <div class="login" :style="{ backgroundImage: `url(${bg})` }">
    <div class="login-box">
      <el-input v-model="user.username" placeholder="请输入账号" />
      <el-input v-model="user.password" placeholder="请输入密码" type="password" show-password clearable />
      <el-button style="width: 100%;" type="primary" @click="loginClick">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { setToken } from "@/util/cookies"
import { loginSys } from "@/api"
import { useRouter } from 'vue-router';
import bg from "@/assets/images/bg.jpg"
import { ElMessage } from "element-plus";

const router = useRouter()
const user = reactive({
  username: '',
  password: '',
  uuid: 'clm.show',
  code: 'clm'
})

const loginClick = async () => {
  if (user.username == '') {
    ElMessage("请输入账号")
    return
  }
  if (user.password == '') {
    ElMessage("请输入密码")
    return
  }
  const res = await loginSys({ ...user })
  setToken(res)
  router.push({ path: '/' })
}

</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  position: relative;

  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;

  .login-box {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>