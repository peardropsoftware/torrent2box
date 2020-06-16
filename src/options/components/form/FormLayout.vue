<template>
  <div id="form-layout">
    <div v-if="!isSuccess">
      <slot></slot>
    </div>
    <div v-else>
      <slot name="onSuccess"></slot>
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
    export default class FormLayout extends Vue {
        @Prop({type: Boolean, default: false})
        isSuccess: boolean;
    }
</script>

<style lang="scss">
  #form-layout {
    // Empty
  }
</style>
