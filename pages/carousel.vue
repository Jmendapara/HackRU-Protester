<template>

<container>
<div id="array">
    <v-row no-gutters>
    <MultiCarousel v-for="protest in protests" :key="protest.title" :protest="protest"></MultiCarousel>
    </v-row>
</div>
</container>

</template>



<script>

import MultiCarousel from './../components/MultiCarousel.vue'
import Component from 'vue-class-component'
import Vue from 'vue'



@Component({})
export default class Attending extends Vue {

    protests= [{title: 'Ashley'},{title: 'Andy'},{title: 'Andrew'},{title: 'Chad'},{title: 'Hiep'},{title: 'Sarah'},{title: 'David'}];

}
</script>

<style>
#gridelement {
    color: #ffffff
}

</style>