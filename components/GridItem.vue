<template>
  <v-card  @click="clickCard(protest.protestID)" class="mx-auto my-3" outlined>
    <v-img
      :src="protest.imgURL"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="300px"
    >
      <v-card-title v-text="protest.title"></v-card-title>
    </v-img>

    <v-card-text align="left">
      <div class="my-2 subtitle-1">
        <v-icon color="primary" small> mdi-map-marker </v-icon>
        {{ protest.location }}
      </div>

      <div class="my-2 subtitle-1">
        <v-icon color="primary" small> mdi-calendar </v-icon>
        {{ protest.date }}
      </div>

      <div class="my-2 subtitle-1">
        <v-icon color="primary" small> mdi-account-group </v-icon>
        {{ protest.attendees }}
      </div>

    </v-card-text>
<!-- 
    <div class="attendingButton mb-5">
      <v-btn outlined rounded color="primary"> Attending
        <v-icon
          right
          primary
        >
          mdi-check
        </v-icon>
         </v-btn>
    </div> -->

  </v-card>
</template>

<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class GridItem extends Vue {
  @Prop()
  protest;

  clickCard(id){
    this.$emit('card-clicked', id)
  }
}
</script>

<style scoped>

.attendingButton{

  display: flex;
  align-items: center;
  justify-content: center;

}

</style>