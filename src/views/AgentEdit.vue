<template>
  <Main>
    <v-card class="pa-5">
      <v-row no-gutters>
        <h4>Анкета агента</h4>
      </v-row>
      <v-row class="d-flex justify-start mt-5" no-gutters>
        <v-avatar size="90">
          <img src="@/assets/avatar.png" alt="" />
        </v-avatar>
      </v-row>
      <v-form class="mt-10">
        <v-row>
          <v-col cols="12" lg="6">
            <v-row no-gutters>
              <v-text-field
                v-model="form.name"
                label="ФИО"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                :items="items"
                label="Специальность"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                class="mr-5"
                :items="items"
                label="Тип цены"
                outlined
                dense
                hide-details
              ></v-select>
              <v-select
                :items="items"
                label="Сектор заказа"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                class="mr-5"
                :items="items"
                label="Регион склада"
                outlined
                dense
                hide-details
              ></v-select>
              <v-select
                :items="items"
                label="Время работы"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                :items="items"
                label="Разрешить видеть список оплат и заказы?"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5 d-flex justify-start" no-gutters>
              <v-btn class="mr-3" outlined color="success" @click="$router.push('/agents')">
                Вернуться назад
              </v-btn>
              <v-btn color="success" @click="$router.push('/agents')">
                Сохранить
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
            <v-row no-gutters>
              <v-text-field
                v-model="form.phone"
                label="Номер телефона"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-text-field
                v-model="password"
                class="mr-2"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Новый пароль"
                hint="At least 8 characters"
                outlined
                dense
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-model="confrimPassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Повторите пароль"
                hint="At least 8 characters"
                outlined
                dense
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-switch
                v-model="switch1"
                :label="'Привязать к телефону?'"
              ></v-switch>
            </v-row>
            <v-row no-gutters>
              <v-switch
                v-model="switch2"
                :label="'Включить GPS - геолокацию?'"
              ></v-switch>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </Main>
</template>

<script>
import http from "../api/http";
import Main from "@/views/Main.vue";
export default {
  components: {
    Main,
  },
  data() {
    return {
      switch1: true,
      switch2: false,
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      items: ["s", "as"],
      password: "",
      confrimPassword: "",
      form: {
        name: "",
        phone: "",
      },
    };
  },
  mounted() {
    http.get(`/users/tp/${this.$route.params.id}`).then((res) => {
      this.form = {
        name: res.data.name,
        phone: res.data.phone,
      };
    });
  },
};
</script>
