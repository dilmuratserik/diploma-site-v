<template>
  <Main>
    <v-card>
      <v-row class="pa-3" no-gutters>
        <v-col class="pr-1" cols="12" lg="2">
          <v-select
            :items="agentType"
            label="Специальность"
            height="40"
            outlined
            hide-details
            dense
            @change="filterByRole"
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="2">
          <v-select
            :items="priceTypes"
            item-text="name"
            item-value="id"
            label="Тип цены"
            outlined
            hide-details
            dense
            @change="filterByPriceType"
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="2">
          <v-select
            :items="storages"
            item-text="name"
            item-value="id"
            label="Регион склада"
            outlined
            hide-details
            dense
            @change="filterByStorage"
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="1">
          <v-select
            :items="priceTypes"
            label="Активен"
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="2">
          <v-text-field outlined dense label="Поиск" @change="searchFilter"></v-text-field>
        </v-col>
        <v-col class="pr-1" cols="12" lg="1">
          <v-btn color="success">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" lg="2">
          <v-btn color="success" @click="$router.push('/agents/add')">
            Добавить агента
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="12" class="pb-0">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="agents"
            :single-select="false"
            :loading="tableLoading"
            :loading-text="'Данные загружаются'"
            item-key="name"
            show-select
            class="elevation-1 w-100"
          >
            <template v-slot:[`item.name`]="{ item }">
              <v-avatar class="mr-3" color="primary" size="40">
                <img
                  style="object-fit: cover"
                  :src="
                    item.avatar ? item.avatar : require('@/assets/avatar.png')
                  "
                  alt="agent_avatar"
                />
              </v-avatar>
              {{ item.name }}
            </template>
            <template v-slot:[`item.edit`]="{ item }">
              <v-icon @click="editRow(item)" color="grey" dark>
                mdi-account-edit
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
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
      selected: [],
      search: "",
      headers: [
        {
          text: "Название",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Телефон", value: "phone" },
        { text: "Специальность", value: "role" },
        { text: "Активен", value: "online" },
        { text: "Тип цены", value: "priceType" },
        { text: "Регион склада", value: "regionStorage" },
        { text: "GPS", value: "gps" },
        { text: "", value: "edit" },
      ],
      agents: [],
      tableLoading: false,
      agentType: [
        { value: 0, text: "По умолчанию" },
        { value: 3, text: "Торговый агент" },
        { value: 4, text: "Курьер" },
      ],
      storages: [],
      priceTypes: [],
      queryParam: {
        page: 1,
        type_price: "",
        role: "",
        storage: "",
        search: "",
      },
    };
  },
  watch: {
    queryParam: {
      handler(el) {
        this.getAgents(el);
      },
      deep: true,
    },
  },
  mounted() {
    this.tableLoading = true;
    this.getAgents()
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
  },
  methods: {
    getAgents(data) {
      this.agents = []
      http.get("/users/tp/", data).then((res) => {
      res.data.results.forEach((el) => {
        this.agents.push({
          id: el.id,
          avatar: el.avatar,
          name: el.name,
          phone: el.phone,
          role:
            el.role === 4
              ? "Курьер"
              : el.role === 3
              ? "Торговый агент"
              : "None",
          online: "Да",
          // regionStorage: el.storage.name,
          gps: "Активен",
        });
      })
      this.tableLoading = false;
    });
    },
    editRow(el) {
      this.$router.push(`/agents/${el.id}`);
    },
    filterByRole(el) {
      if (el === 0) {
        this.queryParam.role = ""
      } else {
        this.queryParam.role = el;
      }
    },
    filterByPriceType(el) {
      this.queryParam.type_price = el
    },
    filterByStorage(el) {
      this.queryParam.storage = el
    },
    searchFilter(el) {
      this.queryParam.search = el
    }
  },
};
</script>
