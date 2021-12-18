<template>
  <Main>
    <v-card class="pa-5">
      <v-row no-gutters>
        <h4>Добавление агента</h4>
      </v-row>
      <v-row class="d-flex justify-center" no-gutters>
        <div class="avatar__wrapper">
          <input type="file" accept="image/*" @change="uploadImage" />
          <v-avatar size="90" color="#E0E0E0">
            <img
              :src="imageUrl ? imageUrl : require('@/assets/noAvatar.svg')"
              alt="image"
            />
          </v-avatar>
          <a>Добавить фото</a>
        </div>
      </v-row>
      <v-form class="mt-10">
        <v-row>
          <v-col cols="12" lg="6">
            <v-row no-gutters>
              <v-text-field
                v-model="agent.name"
                label="ФИО"
                height="40"
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
                height="40"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-col>
                <v-select
                  class="mr-5"
                  :items="priceTypes"
                  v-model="agent.priceType"
                  item-text="name"
                  item-value="id"
                  label="Тип цены"
                  height="40"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="sectors"
                  v-model="agent.sector"
                  item-text="name"
                  item-value="id"
                  label="Сектор заказа"
                  height="40"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                :items="storages"
                v-model="agent.storage"
                item-text="name"
                item-value="id"
                label="Регион склада"
                height="40"
                outlined
                dense
                hide-details
              ></v-select>
            </v-row>
            <v-row class="mt-5" no-gutters>
              <v-select
                :items="showPlan"
                v-model="agent.showPlan"
                label="Разрешить видеть список оплат и заказы?"
                height="40"
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
                height="40"
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
              <v-btn @click="addAgent" color="success"> Сохранить </v-btn>
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
        password: "",
        phone: "",
        priceType: "",
        storage: "",
        sector: "",
        type: null,
        scheduleFrom: "00:00",
        scheduleFor: "00:00",
        showPlan: null,
        image: null,
      },
      imageUrl: "",
      agentType: [
        { value: 3, text: "Торговый агент" },
        { value: 4, text: "Курьер" },
      ],
      items: ["asd", "asd"],
      scheduleWork: ["00:00", "01:00"],
      showPlan: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
      characters: "a-z,A-Z,0-9,#",
      passwordSize: 8,
      snackbar: {
        status: false,
        snackbarText: "",
        snackbarColor: "",
      },
      storages: [],
      priceTypes: [],
      sectors: [],
    };
  },
  mounted() {
    http
      .get("/settings/price/type/")
      .then((res) => {
        this.priceTypes = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    http
      .get("/location/storage/")
      .then((res) => {
        this.storages = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    http
      .get("/settings/order/sector/")
      .then((res) => {
        this.sectors = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    uploadImage(e) {
      const file = e.target.files[0];
      this.agent.image = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
    },
    addAgent() {
      let data = new FormData();
      data.append("avatar", this.agent.image);
      data.append("name", this.agent.name);
      data.append("phone", this.agent.phone);
      data.append("password", this.agent.password);
      data.append("storage", this.agent.storage);
      data.append("price_type", this.agent.priceType);
      data.append("sector_order", this.agent.sector);
      data.append("role", this.agent.type);
      data.append("show_plan", this.agent.showPlan);
      data.append("working_hour_with", this.agent.scheduleFrom);
      data.append("working_hour_until", this.agent.scheduleFor);
      http
        .post("/users/tp/", data)
        .then((res) => {
          console.log(res);
          this.snackbar = {
            status: true,
            snackbarText: "Торговый агент успешно добавлен!",
            snackbarColor: "success",
          };
        })
        .catch(() => {
          this.snackbar = {
            status: true,
            snackbarText: "Что-то пошло не так",
            snackbarColor: "danger",
          };
        });
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
.avatar__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  a {
    color: #196643;
    font-weight: bold;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
  }
  img {
    object-fit: cover;
  }
}
</style>
