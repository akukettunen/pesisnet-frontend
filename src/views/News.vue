<template>
  <v-container style="height: 100%; paddingTop: 120px;">
    <div style="height: 800px;">
      <!-- <iframe id="frame-1" @load="iframeLoaded('frame-1')" width="100%;" src="https://rss.app/embed/v1/wall/_KEUYFzFzSck5h0ZW" frameborder="0"></iframe> -->
      <iframe style="height: 800px;" id="frame-2" width="100%;" src="https://rss.app/embed/v1/wall/_lmbRwK8NSVM6TROs" frameborder="0"></iframe>
    </div>
  </v-container>
</template>

<script>
export default {
  methods: {
    // iframeLoaded(id) {
    //   var iFrameID = document.getElementById(id);
    //   console.log(iFrameID.contentWindow)
    //   if(iFrameID) {
    //         iFrameID.style.height = "";
    //         iFrameID.style.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
    //   }   
    // }
  }
}
</script>