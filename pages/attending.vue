<template>

<container>
<div id="array">
    <v-row no-gutters>
    <GridItem v-for="protest in protests" :key="protest.title" :protest="protest"></GridItem>
    </v-row>
</div>
</container>

</template>



<script>

import GridItem from './../components/GridItem.vue'
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