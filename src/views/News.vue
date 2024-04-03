<template>
  <v-container style="height: 100%; paddingTop: 130px;">
    <div style="height: 800px;">
      <!-- <iframe id="frame-1" @load="iframeLoaded('frame-1')" width="100%;" src="https://rss.app/embed/v1/wall/_KEUYFzFzSck5h0ZW" frameborder="0"></iframe> -->
      <iframe v-res="settings" id="frame-2" height="10000" width="100%" src="https://rss.app/embed/v1/wall/_lmbRwK8NSVM6TROs" frameborder="0"></iframe>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    settings: { 
      autoResize: true, 
      heightCalculationMethod: 'documentElementScroll', 
      log: true, 
      sizeHeight: true, 
      scrolling: false 
    }
  })
}
</script>