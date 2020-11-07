<template>
<v-carousel>
  <v-carousel-item :key="i" v-for="i in 5">
    <v-layout row>
      <v-flex xs4 :key="j" v-for="j in 3">
        <img :src="'https://placehold.it/380x500/?text=' + i + '-' + j" alt="">
      </v-flex>
    </v-layout>
  </v-carousel-item>
</v-carousel>
</template>

<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class MultiCarousel extends Vue {

    @Prop()
    protest

}
</script>