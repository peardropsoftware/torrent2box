<template>
  <div class="form-input-text field">
    <label class="label" :for="label | paramCase">{{label}}</label>
    <div class="control has-icons-left has-icons-right">
      <input :id="label | paramCase"
             class="input"
             :type="inputType"
             :value="value"
             :class="{ 'is-danger': validationErrors, 'is-success': !validationErrors && value }"
             @input="$emit('input', $event.target.value)" />
      <span class="icon is-small is-left">
        <i class="fas" :class="iconClass"></i>
      </span>
      <span v-if="!validationErrors && value" class="icon is-small is-right has-text-success">
        <i class="fas fa-check"></i>
      </span>
      <span v-if="validationErrors" class="icon is-small is-right has-text-danger">
        <i class="fas fa-exclamation"></i>
      </span>
    </div>
    <ul>
      <li v-for="validationError in validationErrors" class="help is-danger">{{validationError}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component({
        name: "form-input-text"
    })
    export default class FormInputTextComponent extends Vue {
        @Prop() inputType: "text" | "password" | "email";
        @Prop() value: string;
        @Prop() validationErrors: string[];
        @Prop() label: string;
        @Prop() iconClass: string;
    }
</script>

<style lang="scss">
    .form-input-text {
        // Empty
    }
</style>
