<template>
  <div class="login">
    <v-container style="height: 100%">
      <div class="d-flex justify-center align-center" style="height: 100%">
        <v-card>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="phone"
              :counter="10"
              label="Телефон"
              required
            ></v-text-field>
          </v-form>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  data() {
    return {
      phone: ''
    }
  },
  mounted() {
    let data = {
      phone: "87473513102",
      password: "123456ak"
    }
    this.login(data).then((res) => {
      localStorage.setItem('token', res.data.key)
    }).catch((err) => {
      console.log(err);
    })
  },
  methods: {
    ...mapActions(["login"])
  }
}
</script>

<style scoped>
.login {
  background: #EEF3F1;
  height: 100vh;
}
</style>