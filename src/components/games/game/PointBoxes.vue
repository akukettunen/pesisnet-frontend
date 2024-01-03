<template>
  <div style="padding-top: 4px; height: 100%; align-items: center;" class="inline flex-d align-center align-self-center">    
    <slot></slot>
  </div>
</template>

<style lang="scss">
.inline {
  display: inline-flex;
  flex-direction: column;
}
</style>