<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://specials-images.forbesimg.com/imageserve/5f6ca0440a763840d039a28c/960x0.jpg?fit=scale"
    ></v-img>

    <v-card-title v-if="protest.title">{{protest.title}}</v-card-title>

    <v-card-text align="left">

      <div class="my-4 subtitle-1">
       {{protest.title}}
      </div>

      <div>{{protest.location}}</div>
      <div>{{protest.title}}</div>
    </v-card-text>

  </v-card>
</template>

<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class GridItem extends Vue {

    @Prop()
    protest

}
</script>