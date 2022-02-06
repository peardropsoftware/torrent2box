<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import {Tab} from "../models/Tab";
import Options from "./Options.vue";
import Information from "./Information.vue";

export default defineComponent({
    name: "StickyFooter",
    components: {
        Options,
        Information
    },
    setup() {
        const tabs: Tab[] = [
            {
                title: "Options",
                iconSrc: "/images/icons/cog.svg#cog",
                component: "Options"
            },
            {
                title: "Information",
                iconSrc: "/images/icons/information.svg#information",
                component: "Information"
            }
        ];

        let dynamicComponent: Ref<string> = ref("Options");
        function selectTab(tab: Tab): void {
            dynamicComponent.value = tab.component;
        }

        function isTabActive(tab: Tab): boolean {
            return dynamicComponent.value === tab.component;
        }

        return {
            tabs,
            dynamicComponent,
            selectTab,
            isTabActive
        };
    }
});
</script>

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
      <component :is="dynamicComponent" class="shadow-lg p-8"></component>
    </div>
    <div><!-- Spacer column --></div>
  </div>
</template>
