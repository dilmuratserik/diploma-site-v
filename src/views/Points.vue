<template>
  <Main>
    <v-card>
      <v-row class="pa-5">
        <v-col>
          <v-select
            :items="items"
            label="Торговый агент"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="items"
            label="Точка"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-btn class="px-7" color="success">
            Долг
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" lg="12">
          <v-data-table
            :headers="headers"
            :items="points"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
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
      headers: [
        {
          text: 'Код',
          value: 'code',
        },
        { text: 'Название', value: 'name' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Агент', value: 'agent' },
        { text: 'Регион', value: 'region' },
        { text: 'Галлеон', value: 'is_galleon' },
        { text: 'Долг', value: 'duty' },
        { text: 'Оплата', value: 'payment' },
        { text: 'Кредит', value: 'credit' }
      ],
      points: [

      ],
      items: [
        'asd', 'asdasd'
      ]
    }
  }
}
</script>