<template>
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    version="21.1"
    :class="{ active: color === 'black' }"
    :style="{ fill: color }"
  >
    <circle cx="25" cy="25" r="25"></circle>
  </svg>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { OthelloColor } from "../Model/othelloModel";
@Component({
  name: "stone"
})
export default class extends Vue {
  @Prop() color!: OthelloColor;
  active: boolean = false;
  clickButton() {
    this.active = !this.active;
  }
}
</script>
<style scoped>
.active {
  transform: rotateX(180deg);
}

svg {
  transition: all 1s;
  /* animation: rotateY 1s linear 0s infinite; */
}
</style>
