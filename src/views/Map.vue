<template>
  <Main>
    <v-card>
      <v-container fluid>
        <v-col>
          <v-row>
            asd
          </v-row>
          <v-row>
            <GmapMap
              :center="center"
              :zoom="15"
              map-type-id="terrain"
              style="width: 100%; height: 700px"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
              />

              <gmap-polyline :path="path">

              </gmap-polyline>
            </GmapMap>
          </v-row>
        </v-col>
      </v-container>
    </v-card>
  </Main>
</template>

<script>
import Main from "./Main.vue"
const point1 = { lat: 43.248450, lng: 76.919425 }
const point2 = { lat: 43.2614715896787, lng: 76.94623391723297 }
export default {
  components: {
    Main,
  },
  data() {
    return {
      markers: [],
      center: point1,
      path: []
    }
  },
  mounted() {
    this.markers = [
      {
        position: point1
      },
      {
        position: point2
      }
    ],
    this.path = [point1, point2]
  }
}
</script>