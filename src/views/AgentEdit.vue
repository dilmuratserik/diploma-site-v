<template>
  <Main>
    <v-card class="pa-5">
      <v-row no-gutters>
        <h4>Анкета агента: {{ agent.name }}</h4>
      </v-row>
      <v-row class="d-flex justify-start mt-5" no-gutters>
        <template>
          <div
            class="agent__avatar"
            :style="
              imageUrl
                ? { background: 'url(' + imageUrl + ')' }
                : {
                    background: 'url(' + require('@/assets/noAvatar.svg') + ')',
                  }
            "
          >
            <div class="upload__wrapper">
              <input type="file" accept="image/*" @change="uploadImage" />
            </div>
          </div>
        </template>
      </v-row>
      <v-form class="mt-10">
        <v-row>
          <v-col cols="12" lg="6">
            <v-row no-gutters>
              <v-text-field
                v-model="agent.name"
                label="ФИО"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                :items="agentType"
                v-model="agent.type"
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
                :items="items"
                label="Регион склада"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                :items="showPlan"
                v-model="agent.showPlan"
                :suffix="'Ч'"
                label="Разрешить видеть список оплат и заказы?"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
            <v-row no-gutters>
              <v-text-field
                v-model="agent.phone"
                label="Номер телефона"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-row>
            <v-row no-gutters class="mt-5">
              <v-col cols="12" lg="8" class="mr-2">
                <v-text-field
                  v-model="agent.password"
                  label="Генерация пароля"
                  name="input-10-1"
                  hide-details
                  outlined
                  dense
                ></v-text-field>
                <span style="font-size: 12px"
                  >Нажмите кнопку чтобы сгенерировать пароль</span
                >
              </v-col>
              <v-col>
                <v-btn @click.prevent="generate">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
        <v-row>
          <v-col cols="12" lg="6">
            <span>Время работы</span>
            <v-row class="mt-2" style="flex-wrap: no-wrap" no-gutters>
              <v-col>
                <v-select
                  :items="scheduleWork"
                  :prefix="'C'"
                  class="mr-5"
                  v-model="agent.scheduleFrom"
                  height="40"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="scheduleWork"
                  :prefix="'По'"
                  v-model="agent.scheduleFor"
                  height="40"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-5 d-flex justify-space-between" no-gutters>
              <v-btn @click="$router.push('/agents')" outlined color="success">
                Вернуться назад
              </v-btn>
              <v-btn @click="editAgent" color="success"> Сохранить </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-snackbar
      v-model="snackbar.status"
      :color="snackbar.snackbarColor"
      absolute
      top
      right
    >
      {{ snackbar.snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
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
      agent: {
        name: "",
        phone: "",
        password: "",
        type: "",
        avatar: "",
        scheduleFrom: "",
        scheduleFor: "",
        showPlan: null,
      },
      agentType: [
        { value: 3, text: "Торговый агент" },
        { value: 4, text: "Курьер" },
      ],
      items: ["s", "as"],
      scheduleWork: ["00:00", "01:00"],
      showPlan: [
        "1",
        "2",
        "4",
        "6",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22",
        "24",
      ],
      characters: "a-z,A-Z,0-9,#",
      passwordSize: 8,
      snackbar: {
        status: false,
        snackbarText: "",
        snackbarColor: "",
      },
      imageUrl: "",
    };
  },
  mounted() {
    http.get(`/users/tp/${this.$route.params.id}`).then((res) => {
      this.imageUrl = res.data.avatar;
      this.agent = {
        name: res.data.name,
        phone: res.data.phone,
        type: res.data.role,
        showPlan: res.data.show_plan.toString(),
        scheduleFor: res.data.working_hour_until,
        scheduleFrom: res.data.working_hour_with,
      };
    });
  },
  methods: {
    editAgent() {
      let data = new FormData();
      if (this.agent.image) {
        data.append("avatar", this.agent.image);
      }
      data.append("name", this.agent.name);
      data.append("phone", this.agent.phone);
      data.append("password", this.agent.password);
      data.append("storage", 1);
      data.append("type_price", 2);
      data.append("order_sector", 1);
      data.append("role", this.agent.type);
      data.append("show_plan", this.agent.showPlan);
      data.append("working_hour_with", this.agent.scheduleFrom);
      data.append("working_hour_until", this.agent.scheduleFor);
      http
        .put(`/users/tp/${this.$route.params.id}/`, data)
        .then((res) => {
          if (res.data.status === "ok") {
            this.snackbar = {
              status: true,
              snackbarText: "Данные успешно обновлены",
              snackbarColor: "success",
            };
          }
        })
        .catch(() => {
          this.snackbar = {
            status: true,
            snackbarText: "Упсс, что-то пошло не так",
            snackbarColor: "red",
          };
        });
    },
    uploadImage(e) {
      const file = e.target.files[0];
      this.agent.image = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
    },
    generate() {
      let charactersArray = this.characters.split(",");
      let CharacterSet = "";
      let password = "";
      if (charactersArray.indexOf("a-z") >= 0) {
        CharacterSet += "abcdefghijklmnopqrstuvwxyz";
      }
      if (charactersArray.indexOf("A-Z") >= 0) {
        CharacterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (charactersArray.indexOf("0-9") >= 0) {
        CharacterSet += "0123456789";
      }

      for (let i = 0; i < this.passwordSize; i++) {
        password += CharacterSet.charAt(
          Math.floor(Math.random() * CharacterSet.length)
        );
      }
      this.$set(this.agent, "password", password);
    },
  },
};
</script>

<style lang="scss" scoped>
.agent__avatar {
  background-position: center center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.upload__wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 20px;
  width: 100%;
  cursor: pointer;
  z-index: 5;
  background: rgba($color: #000000, $alpha: 0.6);
  transition: 0.3s ease-out;
  &:hover {
    transition: 0.3s ease-in;
    height: 100%;
    &::before {
      width: 30px;
      height: 30px;
      transition: 0.3s ease-in;
    }
  }
  &::before {
    position: absolute;
    content: "";
    width: 15px;
    height: 15px;
    background-image: url("../assets/camera.svg");
    background-position: center center;
    background-size: contain;
    transition: 0.3s ease-in;
  }
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
