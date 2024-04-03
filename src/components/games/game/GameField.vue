<template>
  <div>
    <div>
      
    </div>
    <v-img
      v-if="$vuetify.theme.name == 'dark'"
      :height="this.height"
      :width="this.width"
      src="@/assets/images/field_dark.png"
    />
    <v-img
      v-else
      :height="this.height"
      :width="this.width"
      src="@/assets/images/field.png"
    />
    <v-img
      style="position: absolute; top: 100px; left: 50px;"
      height="25"
      width="25"
      src="@/assets/images/ball.png"
    />
    <div class="gf-player">
      <div class="gf-player-left">
        <div class="gf-player-left-icon sport-font">
          3
        </div>
      </div>
      <div class="gf-player-name sport-font">
        Jari Lettunen
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['height', 'width']
}
</script>

<style lang="scss">
.gf-player {
  position: absolute;
  left: -30px;
  top: 155px;
  display: flex;

  &-left {
    z-index: 1;

    &-icon {
      justify-content: center;
      align-items: center;
      display: flex;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: black;
      line-height: 100%;
      height: 30px;
    }
  }

  &-name {
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: black;
    padding-left: 25px;
    padding-right: 12px;
    margin-left: -15px;
    height: 25px;
    margin-top: 2.5px;
    border-radius: 5px;
    font-size: 12px;
  }
}
</style>