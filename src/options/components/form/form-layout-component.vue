<template>
  <div id="form-layout" class="level">
    <div class="columns is-centered level-item">
      <div v-if="!isSuccess" class="column is-half">
        <slot></slot>
      </div>
      <div v-else class="column is-half has-text-centered">
        <slot name="onSuccess"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {Prop} from "vue-property-decorator";

  @Component({
      name: "form-layout"
  })
  export default class FormLayoutComponent extends Vue {
      @Prop({type: Boolean, default: false})
      isSuccess: boolean;
  }
</script>

<style lang="scss">
  #form-layout {
    // Empty
  }
</style>
