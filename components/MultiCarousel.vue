<template>
<v-carousel>
  <v-carousel-item :key="i" v-for="i in 6"
  reverse-transition="slide-fade"
  transition="slide-fade">
      
    <v-row no-gutters>


        <GridItem  
                  v-for="(protest, i) in protests"
                  :key="protest.title" 
                  :protest="protest"></GridItem>

      
    </v-row>
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

    protests= [{title: 'Ashley'},{title: 'Andy'},{title: 'Andrew'},{title: 'Chad'},{title: 'Hiep'},{title: 'Sarah'},{title: 'David'}];

}
</script>