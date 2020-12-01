<template>
  <div class="grid grid-cols-5">
    <div><!-- Spacer column --></div>
    <!-- tabs column -->
    <div class="col-span-5 md:col-span-3 bg-gray-200 m-4">
      <!-- tab headers -->
      <ul class="flex bg-gray-300">
        <li v-for="tab of tabs"
            class="p-2 cursor-pointer border border-transparent"
            :class="{ 'bg-gray-200': isTabActive(tab), 'bg-blue-200 hover:bg-gray-200 hover:border-black hover:border-dotted hover:border-b': !isTabActive(tab) }"
            @click="selectTab(tab)">
          <div class="flex items-center">
            <svg class="h-8 w-8 pr-2">
              <use :href="tab.iconSrc" />
            </svg>
            <span class="pr-2 text-base">{{tab.title}}</span>
          </div>
        </li>
      </ul>
      <!-- tab content -->
      <component :is="dynamicComponent" class="t2b-shadow p-8"></component>
    </div>
    <div><!-- Spacer column --></div>
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
            iconSrc: "/images/svg/cog.svg#cog",
            component: OptionsForm
        },
        {
            title: "Information",
            iconSrc: "/images/svg/information.svg#information",
            component: Information
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

<style lang="css">
.t2b-shadow {
    box-shadow: 10px 10px 8px rgba(136, 136, 136, 1);
}
</style>
