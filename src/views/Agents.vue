<template>
  <Main>
    <v-card>
      <v-row class="pa-3" no-gutters>
        <v-col class="pr-1" cols="12" lg="2">
          <v-select
            :items="items"
            label="Точка"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="2">
          <v-select
            :items="items"
            label="Агент"
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="2">
          <v-select
            :items="items"
            label="Курьер"
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="1">
          <v-select
            :items="items"
            label="Курьер"
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col class="pr-1" cols="12" lg="2">
          <v-text-field outlined dense label="Поиск"></v-text-field>
        </v-col>
        <v-col class="pr-1" cols="12" lg="1">
          <v-btn
            color="success"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" lg="2">
          <v-btn
            color="success"
          >
            Добавить агента
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="12">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="agents"
            :single-select="false"
            item-key="name"
            show-select
            class="elevation-1 w-100"
          >
            <template v-slot:[`item.name`]="{ item }">
              <v-avatar
                class="mr-3"
                color="primary"
                size="40"
              >
                <img src="@/assets/avatar.png" alt="">
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
import Main from '@/views/Main.vue'
export default {
  components: {
    Main
  },
  data() {
    return {
      selected: [],
      headers: [
        {
          text: 'Название',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Телефон', value: 'phone' },
        { text: 'Специальность', value: 'speciality' },
        { text: 'Активен', value: 'online' },
        { text: 'Тип цены', value: 'priceType' },
        { text: 'Регион склада', value: 'regionStorage' },
        { text: 'GPS', value: 'gps' },
        { text: '', value: 'edit' }
      ],
      agents: [
        {
          id: '01',
          name: 'Маратов Марат',
          phone: '+77471612324',
          speciality: 'Торговый агент',
          online: 'Да',
          priceType: 'Розничный',
          regionStorage: 'Склад Алматы',
          gps: 'Активен',
        },
        {
          id: '02',
          name: 'Маратов Марат',
          phone: '+77471612324',
          speciality: 'Торговый агент',
          online: 'Да',
          priceType: 'Розничный',
          regionStorage: 'Склад Алматы',
          gps: 'Активен',
        },
        {
          id: '03',
          name: 'Маратов Марат',
          phone: '+77471612324',
          speciality: 'Торговый агент',
          online: 'Да',
          priceType: 'Розничный',
          regionStorage: 'Склад Алматы',
          gps: 'Активен',
        },
        {
          id: '04',
          name: 'Маратов Марат',
          phone: '+77471612324',
          speciality: 'Торговый агент',
          online: 'Да',
          priceType: 'Розничный',
          regionStorage: 'Склад Алматы',
          gps: 'Активен',
        },
      ]
    }
  },
  methods: {
    editRow(el) {
      this.$router.push(`/agents/${el.id}`)
    }
  }
}
</script>