<template>
  <div class="loader">
    <div class="bar"></div>
  </div>
  <div class="background">
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingInitiator',
  emits: ["loaderLauncher"]
})

</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

@keyframes loader-animation {
  0% {
    left: -100%;
  }

  49% {
    left: 100%;
  }

  50% {
    left: 100%;
  }

  100% {
    left: -100%;
  }
}

.loader {
  height: 5px;
  width: 100%;
}

.loader .bar {
  width: 100%;
  position: absolute;
  height: 5px;
  background-color: dodgerblue;
  animation-name: loader-animation;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  z-index: -1;
}

.background {
  background-color: rgba(141, 141, 141, 0.5);
  height: 800px;
  width: 100%;
  position: fixed;
  z-index: 1;
}
</style>