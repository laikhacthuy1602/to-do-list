<template>
  <div class="container">
    <h3 class="mt-3 mb-3 text-center">SIGN IN</h3>
    <el-row style="width: 1024px">
      <el-col :span="6"><div class="box_hidden"></div></el-col>
      <el-col :span="12">
        <div class="box_form">
          <el-form ref="formLogin" :model="form" :rules="rules">
            <label for="">Email</label>
            <el-form-item prop="email">
              <el-input v-model="form.email" class="input-form" type="email"></el-input>
            </el-form-item>
            <label for="">Password</label>
            <el-form-item prop="password">
              <el-input v-model="form.password" class="input-form" type="password"></el-input>
            </el-form-item>
            <el-button
              type="primary"
              @click="handleLogin('formLogin')"
              class="btn-login"
            >Sign In</el-button>
            <p class="text-center mt-3">
              <router-link to="/sign-up">Sign Up Now</router-link>
            </p>
          </el-form>
          <div v-if="errors.length >0">
            <ul v-for="(message, index) in errors" :key="index">
              <li v-text="message"></li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="6"><div class="box_hidden"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import API from '../../axios/auth/auth';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true, type: 'email', message: 'Nhập email đê', trigger: 'blur',
          },
          {
            min: 1, max: 100, message: 'Email tối đa 100 ký tự', trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: 'Nhập password', trigger: 'blur' },
          {
            min: 8, max: 64, message: 'Password tối thiểu 8 ký tự', trigger: 'blur',
          },
        ],
      },
      errors: [],
    };
  },
  methods: {
    handleLogin(formLogin) {
      this.$refs[formLogin].validate(async (valid) => {
        if (!valid) return;
        try {
          const dataLogin = {
            email: this.form.email,
            password: this.form.password,
          };
          const response = await API.login('/login', dataLogin);
          if (response.data) {
            console.log(response);
            this.$store.dispatch('setUser', response.data.user);
            this.$router.push({ name: 'Home' });
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 1024px;
  margin: 0 auto;
}
.btn-login {
  width: 100%;
}
.box_form {
  background-color: #fff;
  padding: 10px 15px 30px;
}
.box_hidden {
  background-color: #dbdbdb;
  height: 30px;
}
</style>
