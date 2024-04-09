<template>
  <v-expand-transition>
    <v-sheet v-if="latest_runner_data.player_id">
      <v-sheet class="sport-font pl-4" style="font-size: 10px;">
        Kärkietenijä {{ latest_runner_data.player_name }}
      </v-sheet>
      <v-sheet class="pa-2" style="border-radius: 10px; display: flex; flex-direction: row; justify-content: space-between;">
        <v-avatar size="60px" color="secondary" style="border: 2px solid lightgrey;">
          <div 
            :style="{ 
              'height': '70px',
              'width': '70px',
              'background-image': `url('${latest_runner_data.player.image.medium}')`,
              'background-size': '170%', 
              'background-position': 'center top',
            }"
            class="my-avatar-img" 
            v-if="latest_runner_data.player.image.medium" 
            width="40" 
            style="border-radius: 50%;" cover 
          />
        <v-icon size="30" v-else>mdi-account-outline</v-icon>
      </v-avatar>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div>
          Paras {{ mapped_bases[latest_runner_data.current_base] }}
        </div>
        <div v-if="latest_runner_data.times.length" class="sport-font" style="font-size: 20px;">
          <v-chip>
            {{ latest_runner_data.times.find(t => t.base == latest_runner_data.current_base)?.min_aika }}
          </v-chip>
        </div>
        <v-chip v-else>
          Ei dataa
        </v-chip>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div>
          Keskiarvo {{ mapped_bases[latest_runner_data.current_base] }}
        </div>
        <div v-if="latest_runner_data.times.length" class="sport-font" style="font-size: 20px;">
          <v-chip>
            {{ latest_runner_data.times.find(t => t.base == latest_runner_data.current_base)?.avg_aika }}
          </v-chip>
        </div>
        <v-chip v-else>
          Ei dataa
        </v-chip>
      </div>
      <div class="d-flex flex-column">
        <v-chip class="mb-1" size="small" label>
          Kausi {{ latest_runner_data.season }}
        </v-chip>
        <v-chip size="small" label>
          Väli {{ mapped_bases[latest_runner_data.current_base] }}
        </v-chip>
      </div>
        <!-- {{ latest_runner_data }} -->
      </v-sheet>
    </v-sheet>
  </v-expand-transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    mapped_bases: {
      1: '1-2',
      2: '2-3',
      3: '3-K'
    }
  }),
  computed: {
    ...mapGetters('game', [
      'latest_runner_data'
    ])
  }
}
</script>