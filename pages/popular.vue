<template>
    <v-container>
    <div>
        CLICK HERE TO OPEN PROTEST

        <v-dialog
            v-model="dialog"
            width="80%"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
                Open Dialog
            </v-btn>
            </template>

            <Protest :protestInfo="protest"></Protest>

        </v-dialog>

    </div>
    </v-container>
</template>

<script>
  import {fireDb} from '~/plugins/firebase.js'
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {userStore} from './../store/userStore.ts'
  import GridItem from './../components/Protest.vue'


@Component({})
export default class Popular extends Vue{

    protest = {
        title:"Test Title",
        url:"https://memegenerator.net/img/instances/71780213.jpg",
        date:"2020-10-14",
        time:"07:05",
        location:"NYC",
        comments:['Commment 1', 'comment2', 'comments3'],
        id:2323,
        tags:["tage1", "tag2", "tag3"],
        description:"HERE IS THE DESCRPITON ABOUT THE PRETEST TEEHHE",
        attendees:25
    }


    dialog=false;

}

    
</script>


<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-grow: 1;
    height: 100%;
  }
  .uname{
    font-size:12px;
    text-align:left;
    position:relative;
    bottom:20px;  
    }
  .pa-8{
    width:30%;
  }

</style>