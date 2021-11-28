<template>
  <div class="login">
    <v-container style="height: 100%">
      <div class="d-flex justify-center align-center" style="height: 100%">
        <v-card class="col-xl-4 col-lg-5 col-md-6 py-10 px-3">
          <div class="d-flex justify-center">
            <img
              src="@/assets/logo.png"
              style="width: 144px; height: 54px"
              alt="logo"
            />
          </div>
          <div class="d-flex flex-column align-center justify-center my-3">
            <h4 style="font-size: 26px">Добро пожаловать</h4>
            <p style="font-size: 16px; color: #9fa2b4">
              Введите свой адрес электронной почты и пароль ниже
            </p>
          </div>
          <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.phone"
              class="my-2"
              label="Телефон"
              :rules="phoneRules"
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              class="my-2"
              label="Пароль"
              :rules="passwordRules"
              type="password"
              required
              outlined
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn
                style="width: 100%; background: #196643; color: #ffffff"
                class="py-6"
                @click="sendLogin"
                >Войти</v-btn
              >
            </div>
          </v-form>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      form: {
        phone: "",
        password: "",
      },
      phoneRules: [(v) => !!v || "Данное поле объязательное"],
      passwordRules: [(v) => !!v || "Данное поле объязательное"],
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["login"]),
    sendLogin() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        let data = {
          phone: this.form.phone,
          password: this.form.password,
        };
        this.login(data)
          .then((res) => {
            localStorage.setItem("token", res.data.key);
            this.$refs.form.reset()
            this.$router.push('/')
          })
          .catch((err) => {
            console.log(err);
            this.$refs.form.reset()
          });
      }
    },
  },
};
</script>

<style scoped>
.login {
  background: #eef3f1;
  height: 100vh;
}
</style>
