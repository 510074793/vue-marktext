<template>
  <div class="login">
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


  console.log(res)

  router.push({ path: '/' })

}

</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
}
</style>