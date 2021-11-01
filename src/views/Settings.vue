<template>
  <Main>
    <v-card>
      <v-tabs
        v-model="tab"
        fixed-tabs
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="mt-5">
        <v-tab-item>
          <v-container>
            <v-col
              cols="12"
              lg="6"
            >
              <v-row>
                <v-text-field
                  label="ФИО директора"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-select
                  outlined
                  label="Пол"
                >

                </v-select>
              </v-row>
               <v-row>
                <v-text-field
                  label="Название компании"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-btn color="success">
                  Сохранить
                </v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-col
              cols="12"
              lg="6"
            >
              <v-row>
                <v-text-field
                  label="Логин"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-select
                  outlined
                  label="Часовой пояс"
                >

                </v-select>
              </v-row>
               <v-row>
                <v-text-field
                  class="mr-5"
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Новый пароль"
                  hint="At least 8 characters"
                  outlined
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Повторите пароль"
                  hint="At least 8 characters"
                  outlined
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-row>
              <v-row no-gutters>
                <v-switch
                  v-model="switch1"
                  :label="'Получать рассылки от приложений?'"
                ></v-switch>
              </v-row>
              <v-row>
                <v-btn color="success">
                  Сохранить
                </v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-col
              cols="12"
              lg="6"
            >
              <v-row>
                <v-text-field
                  label="Юридическое название компании"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  label="БИН компании"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  label="Email"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  label="Контактное лицо"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  label="Основной склад"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  label="Минимальная сумма заказа"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                <v-select
                  outlined
                  label="Единица измерения"
                >
                </v-select>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              lg="6"
            >
              <v-row>
                 <v-select
                    outlined
                    label="Единица измерения"
                  >
                </v-select>
              </v-row>
              <v-row>
                 <v-text-field
                  label="Адрес"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                 <v-text-field
                  label="Адрес"
                  outlined
                >
                </v-text-field>
              </v-row>
              <v-row>
                 <v-select
                    outlined
                    label="Основной тип цены"
                  >
                </v-select>
              </v-row>
              <v-row>
                 <v-select
                    outlined
                    label="Сектор заказов"
                  >
                </v-select>
              </v-row>
              <v-row>
                 <v-select
                    outlined
                    label="Тип оплаты в заказе"
                  >
                </v-select>
              </v-row>
            </v-col>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </Main>
</template>

<script>
import Main from '@/views/Main.vue'
export default {
  components: {
    Main
  },
  data() {
    return {
      tab: null,
      switch1: false,
      items: [
        'Анкетные данные', 'Учетные данные ', 'Данные компании'
      ],
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    }
  }
}
</script>