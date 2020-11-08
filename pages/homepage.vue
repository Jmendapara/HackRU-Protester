<template>
  <v-container>
    <div class="create">
      <h1>Search</h1>
      
         <v-text-field
        v-model="search"
        label="Search"
        hide-details
        prepend-inner-icon="mdi-magnify" class="shrink mx-4"
        single-line
        filled
        rounded
        dense 
    ></v-text-field>
    </div>

    <div class="protestList">
      <v-subheader>Popular Protests</v-subheader>
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="3"
          v-for="protest in myProtests"
          :key="protest.title"
        >
          <GridItem :protest="protest"></GridItem>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
/* .create{
    position: absolute;
    top:70px;
    right:40px;
}
div h1{
    position: absolute;
    top:70px;
    left: 60px;
    letter-spacing: 0.08em;
    font-family: Spartan, Sans-Serif;
    font-style: normal;
    font-weight: 300;
    font-size: 40px;
    line-height: 45px;
} */

.create {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  letter-spacing: 0.06em;
  font-family: Spartan, Sans-Serif;
  font-style: normal;
  font-weight: 300;
  line-height: 45px;
}
</style>

<script>
</script>