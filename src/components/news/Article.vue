<template>
  <v-sheet class="my-2">
    <div @click="openLink()" style="cursor: pointer; min-height: 100px;" v-if="item['media:content'].$.medium == 'image'">
      <v-img
        width="100%"
        max-width="100%"
        style="border-radius: 30px;"
        :src="item['media:content'].$.url"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>    
      </v-img>
    </div>
    <div class="pa-3">
      <v-sheet @click="openLink()" class="text-h5" style="font-size: 20px; cursor: pointer;">
        {{  item.title }}
      </v-sheet>
      <v-chip label size="small" class="mt-1">
        {{ item['dc:creator'] }}
      </v-chip>
    </div>
    {{ item }}
  </v-sheet>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    openLink() {
      window.open(this.item.link)
    }
  }
}
</script>