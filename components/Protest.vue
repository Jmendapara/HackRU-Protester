<template>
  
  <v-card class="pa-4">
      
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="250"
        :src="protestInfo.imgURL"
      ></v-img>
  
      <v-card-title class="card-title">{{protestInfo.title}}</v-card-title>
  
      <v-card-text>

        <div class="my-2 subtitle-1">
           <v-icon
            color="primary"
            small
            >
            mdi-map-marker
             </v-icon>
             {{protestInfo.location}}
        </div>

         <div class="my-2 subtitle-1">
           <v-icon
            color="primary"
            small
            >
            mdi-calendar
             </v-icon>
             {{protestInfo.date}}
        </div>

        <div class="my-2 subtitle-1">
           <v-icon
            color="primary"
            small
            >
            mdi-clock
             </v-icon>
             {{protestInfo.time}}
        </div>

        <div class="my-2 subtitle-1">
           <v-icon
            color="primary"
            small
            >
            mdi-account-group
             </v-icon>
             {{protestInfo.attendees}}
        </div>
  
        <div class="mt-5">{{protestInfo.description}}</div>
      </v-card-text>
    
      <v-card-title class="mt-0 pt-0">Related Tags</v-card-title>
  
      <v-card-text>
        <v-chip-group
          v-model="selection"
          column
        >
          <v-chip v-for="tag in protestInfo.tags" :key="tag">{{tag}}</v-chip>

        </v-chip-group>
      </v-card-text>
  
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="attend"
        >
          Attend
        </v-btn>

        <v-btn
          color="secondary"
          text
          @click="edit"
        >
          Edit
        </v-btn>

      </v-card-actions>
    
  </v-card>
</template>

<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Protest extends Vue {

    @Prop()
    protestInfo

}
</script>

<style scoped>

.card-title{
    font-size: 2rem !important;
}

</style>