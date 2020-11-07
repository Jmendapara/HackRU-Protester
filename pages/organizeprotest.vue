<template>
  <container>
    <h2>Create a Protest</h2>
  <p></p>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
            v-model="title"
            label="Title"
            outlined
            required
        ></v-text-field>
        <v-text-field
            outlined
            v-model="location"
            label="Location"
            prepend-inner-icon="mdi-map-marker"
            required
        ></v-text-field>

         <v-menu
            
            v-model="fromDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y 
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Date"
                readonly
                :value="fromDateDisp"
                v-on="on"
                outlined
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="fromDateVal"
              no-title
              @input="fromDateMenu = false"
              :min="minDate"
              :max="maxDate"
            ></v-date-picker>
        </v-menu>


      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Time"
            prepend-inner-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>

         <v-textarea
            v-model="description"
            label="Description"
            outlined
            required
        ></v-textarea>
       
          <v-combobox multiple
                    outlined
                    v-model="taglist" 
                    label="Tags" 
                    append-icon
                    chips
                    deletable-chips
                    class="tag-input"
                    :search-input.sync="search" 
                    @keyup.tab="updateTags"
                    @paste="updateTags">
          </v-combobox>

        <v-btn
          color=#3058A4
          elevation="1"
          rounded
          @click="createProtest"
        >Create</v-btn>
      </v-form>
  </container>
</template>
<style>
label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: .4rem 0;
    color: white;
}
</style>
<script>
  import {fireDb} from '~/plugins/firebase.js'

  export default {
    data() {
      return {
        fromDateMenu: null,
        fromDateVal: null,
        writeSuccessful: true,

        minDate: new Date().toISOString().slice(0,10),
        date: new Date(), 
        time: null,
        menu2: false,
        modal2: false,
        title:'',
        location:'',
        description:'',
        taglist: '',

      };
    },
    computed: {
           maxDate() {
            var endDate = new Date(this.date.getFullYear()+10,11,31);
            return endDate.toISOString().slice(0,10)
            }
        
    },
  
  methods:{
      async createProtest(){
      if(this.title === '' || this.title === null || this.fromDateVal === '' || this.fromDateVal === null 
      || this.time === '' || this.time === null || this.location === '' || this.location === null ){
          alert("Error: Missing fields")
          this.writeSuccessful = false;
        }
        if(this.writeSuccessful){
          const res = await fireDb.collection('protests').add({
              title:this.title,
              date: this.fromDateVal,
              time: this.time,
              location:this.location,
              description:this.description,
              tags: this.taglist
              
          });
          alert('Success')
        } 
      },

      updateTags() {
              alert('Entered updateTags')
              this.$nextTick(() => {
                this.taglist.push(...this.search.split(","));
                this.$nextTick(() => {
                  this.search = "";
                });
              });
              alert('Left updateTags')
            }
        }
  };
</script>

