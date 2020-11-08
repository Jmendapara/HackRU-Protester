<template>
  <v-card
    class="mx-auto my-3"
    max-width="374"
    outlined
    rounded
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
      :src="protest.imgURL"
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