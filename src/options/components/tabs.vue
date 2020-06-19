<template>
  <div id="tabs" class="columns is-centered">
    <div class="column is-three-fifths">
      <!-- tabs -->
      <div class="tabs is-toggle is-marginless">
        <ul>
          <li v-for="tab of tabs" :class="{ 'is-active': isTabActive(tab), 'is-inactive': !isTabActive(tab) }">
            <a @click="selectTab(tab)">
              <span class="icon is-small"><i class="fas" :class="tab.icon" aria-hidden="true"></i></span>
              <span>{{tab.title}}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- tabs -->
      <component :is="dynamicComponent" class="tab-content"></component>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import OptionsForm from "./OptionsForm.vue";
    import Information from "./Information.vue";
    import {TabModel} from "../models/TabModel";

    @Component({
        name: "tabs"
    })
    export default class Tabs extends Vue {
        tabs: TabModel[] = [
            {
                title: "Options",
                component: OptionsForm,
                icon: "fa-cog"
            },
            {
                title: "Information",
                component: Information,
                icon: "fa-info-circle"
            }
        ];
        dynamicComponent: Vue.Component = this.tabs[0].component;

        selectTab(tabModel: TabModel): void {
            this.dynamicComponent = tabModel.component;
        }

        isTabActive(tabModel: TabModel): boolean {
            return this.dynamicComponent === tabModel.component;
        }
    }
</script>

<style lang="scss">
  #tabs {
    a .icon {
      font-weight: bold;
    }

    .is-active a {
      background-color: $t2b-gray-lightest;
      border-radius: 0;
    }

    .is-inactive a {
      background-color: $t2b-blue-lightest;
      border-color: #b5b5b5;
      border-bottom: none;
    }

    .is-inactive a:hover {
      background-color: $t2b-gray-lightest;
      border-color: #b5b5b5;
      border-bottom: none;
    }
  }
</style>
