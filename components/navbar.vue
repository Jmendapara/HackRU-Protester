<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="light-gray"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
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
      <v-spacer></v-spacer>
    <v-btn
      text
      color="primary"
    > Popular
    </v-btn>
        <v-btn
      text
      color="primary"
    >
      Attending
    </v-btn>
    <v-btn
      text
      color="primary"
    > Organized
    </v-btn>
      <v-btn icon>
        <v-icon color="red">mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">
      </v-container>
    </v-sheet>
  </v-card>
</template>
