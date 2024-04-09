<template>
  <div class="d-flex justify-center mt-5">
    <div style="height: 100%; position: relative;">
      <v-img style="border-radius: 20px;" :width="real_width" src="https://epesis.fi/logos/kentta.png"></v-img>
      <div
        v-for="e in events"
        :key="e.eventId"
        :class="{ 
          vapaa: e.tulos == 'Vapaa',
          vapaa_lyonti: e.vapaa,
          palo: e.tulos == 'Palo' || e.tulos == 'Takapalo',
          haava: e.tulos == 'Haava',
          kl: e.tulos == 'Kärkilyönti' || e.tulos == 'Takaeteneminen'
        }"
        :style="`
          position: absolute;
          top: ${top * (e.koordinaatit ? e.koordinaatit.y : 0)}px;
          left: ${real_width * (e.koordinaatit ? e.koordinaatit.x : 0)}px;
          height: 10px;
          width: 10px;
        `"
        class="hit"
      >
        <v-tooltip
          activator="parent"
        >
          <div>
            Lyöjä - {{ e.lyoja }}
          </div>
          <div>
            Palot - {{ e.palot }}
          </div>
          <div>
            Tulos - {{ e.tulos }}
          </div>
          <div>
            Lukkari - {{ e.lukkari }}
          </div>
          <div>
            Lyönti - {{ e.lyonti }}.
          </div>
          <div>
            Tyyppi - {{ e.tyyppi }}
          </div>
          <div v-if="e.kuvio">
            Up-kuvio - {{ e.kuvio }}
          </div>
          <!-- {{ e }} -->
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['events', 'width'],
  computed: {
    top() {
      return this.real_width * 1.6054
    },
    real_width() {
      return this.width || 300
    }
  }
}
</script>

<style lang="scss">
.vapaa { background-color: rgb(103, 101, 114); }
.kl { background-color: rgb(19, 184, 102); }
.palo { background-color: rgb(190, 42, 42); }
.haava { background-color: rgb(212, 194, 91); }
.hit {
  &:hover {
    z-index: 10;
  }

  border: 1px solid black;
  border-radius: 50%;
}
.vapaa_lyonti {
  border-radius: 0px !important;
}
  
</style>