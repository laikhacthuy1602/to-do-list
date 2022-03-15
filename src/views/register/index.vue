<template>
  <div class="container">
    <h3 class="mt-3 mb-3 text-center">SIGN UP</h3>
    <el-row style="width: 1024px">
      <el-col :span="6"><div class="box_hidden"></div></el-col>
      <el-col :span="12">
        <div class="box_form">
          <el-form ref="formRegister" :model="form" :rules="rules">
            <label for="">Email</label>
            <el-form-item prop="email">
              <el-input v-model="form.email" type="email"></el-input>
            </el-form-item>
            <label for="">Password</label>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <label for="">Password Confirm</label>
            <el-form-item prop="passwordConfirm">
              <el-input v-model="form.passwordConfirm" type="password"></el-input>
            </el-form-item>
            <el-button
              type="primary"
              @click="handleRegister('formRegister')"
              class="btn-login"
            >REGISTER</el-button>
            <p class="text-center mt-3">
              <router-link to="/sign-in">Sign In</router-link>
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
    const validatePasswordConfirm = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('Password confirm không giống'));
      } else {
        callback();
      }
    };

    return {
      form: {
        email: '',
        password: '',
        passwordConfirm: '',
      },
      rules: {
        email: [
          {
            type: 'email', required: true, message: 'Nhập email', trigger: 'blur',
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
        passwordConfirm: [
          { required: true, message: 'Nhập lại password', trigger: 'blur' },
          { validator: validatePasswordConfirm, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleRegister(formRegister) {
      this.$refs[formRegister].validate(async (valid) => {
        if (!valid) return;
        try {
          const data = {
            email: this.form.email,
            password: this.form.password,
            passwordConfirm: this.form.passwordConfirm,
          };
          const response = await API.register('/register', data);
          if (response.data) {
            this.$router.push('/sign-in');
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
