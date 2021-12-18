<template>
  <Main>
    <v-card>
      <v-tabs
        v-model="tab"
        class="w-100"
        fixed-tabs
        center-active
        centered
        hide-slider
        height="80"
        color="#5C5C5C"
        background-color="#1966431A"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="mt-5">
        <v-tab-item>
          <v-container>
            <v-col cols="12" lg="6">
              <v-row>
                <v-text-field label="ФИО директора" outlined dense></v-text-field>
              </v-row>
              <v-row>
                <v-select outlined label="Пол" dense></v-select>
              </v-row>
              <v-row>
                <v-text-field label="Название компании" outlined dense>
                </v-text-field>
              </v-row>
              <v-row>
                <v-btn class="px-10" color="success" large> Сохранить </v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-col cols="12" lg="6">
              <v-row>
                <v-text-field label="Логин" outlined dense> </v-text-field>
              </v-row>
              <v-row>
                <v-select outlined label="Часовой пояс" dense> </v-select>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="credentials.password"
                  class="mr-5"
                  name="input-10-1"
                  label="Новый пароль"
                  hint="At least 8 characters"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="credentials.password"
                  name="input-10-1"
                  label="Повторите пароль"
                  hint="At least 8 characters"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
              <v-row no-gutters>
                <v-switch
                  v-model="switch1"
                  :label="'Получать рассылки от приложений?'"
                ></v-switch>
              </v-row>
              <v-row>
                <v-btn class="px-10" color="success" large> Сохранить </v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field label="Юридическое название компании" outlined dense>
                </v-text-field>
                <v-text-field label="БИН компании" outlined dense> </v-text-field>
                <v-text-field label="Email" outlined dense> </v-text-field>
                <v-text-field label="Контактное лицо" outlined dense> </v-text-field>
                <v-text-field label="Основной склад" outlined dense> </v-text-field>
                <v-text-field label="Минимальная сумма заказа" outlined dense>
                </v-text-field>
                <v-select outlined label="Единица измерения" dense> </v-select>
              </v-col>
              <v-col cols="12" lg="6">
                <v-select outlined label="Регион" dense> </v-select>
                <v-text-field label="Адрес" outlined dense> </v-text-field>
                <v-text-field label="Телефон" outlined dense> </v-text-field>
                <v-select outlined label="Основной тип цены" dense> </v-select>
                <v-select outlined label="Сектор заказов" dense> </v-select>
                <v-select outlined label="Тип оплаты в заказе" dense> </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <v-btn class="px-10" color="success" large> Сохранить </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </Main>
</template>

<script>
import Main from "@/views/Main.vue";
export default {
  components: {
    Main,
  },
  data() {
    return {
      tab: null,
      switch1: false,
      items: ["Анкетные данные", "Учетные данные ", "Данные компании"],
      show1: false,
      show2: false,
      worksheet: {
        fullName: "",
        gender: "",
        companyName: "",
      },
      credentials: {
        login: "",
        timeZone: "",
        password: "",
        passwordConfrim: "",
      },
      companyData: {
        companyFullName: "",
        region: "",
        bin: "",
        address: "",
        email: "",
        phone: "",
        contactPerson: "",
        mainPriceType: "",
        mainStorage: "",
        mainSector: "",
        orderSectors: "",
        minOrderTotal: "",
        typePayment: "",
        unit: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.v-tab--active {
  background-color: #ffffff;
  color: #000!important;
  border-radius: 8px 8px 0 0;
  &:hover {
    background: #ffffff !important;
  }
}

.v-tab {
  width: 100% !important;
  margin: 0 !important;
  max-width: 100% !important;
  &:hover {
    background: transparent !important;
  }
}
</style>