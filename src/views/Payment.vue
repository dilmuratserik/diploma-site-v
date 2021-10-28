<template>
  <Main>
    <v-card>
      <v-row class="pa-5">
        <v-col>
          <v-select
            :items="items"
            label="Торговая точка"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="items"
            label="Дата"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="items"
            label="Тип оплаты"
            height=40
            outlined
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-btn class="px-7" color="success">
            Показать рейтинг
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" lg="12">
          <v-data-table
            :headers="headers"
            :items="payments"
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
          text: 'Номер',
          value: 'number',
        },
        { text: 'Точка', value: 'name' },
        { text: 'Дата', value: 'phone' },
        { text: 'Агент', value: 'agent' },
        { text: 'Комментарии', value: 'region' },
        { text: 'Тип оплаты', value: 'is_galleon' },
        { text: 'Сумма', value: 'duty' },
      ],
      payments: [

      ]
    }
  }
}
</script>