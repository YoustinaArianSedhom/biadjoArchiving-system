<!-- =========================================================================================
    File Name: VxTimeline.vue
    Description: Timeline Component
    Component Name: VxTimeline
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <ul class="vx-timeline">
    <li v-for="item in data" :key="item.id">
      <div class="timeline-icon bg-primary">
        <!-- <div class="timeline-icon" :class="`bg-${item.color}`"> -->

        <feather-icon
          icon="CheckIcon"
          style="color:white"
          svgClasses="text-white  w-5 h-5"
        />
      </div>
      <div class="timeline-info">
        <p class="font-semibold">{{ item.Notice }}</p>
        <span class="activity-desc">{{ item.AdminUserFullName }}</span>
      </div>
      <small class="text-grey activity-e-time">{{
        item.DateTime | formatDate()
      }}</small>
    </li>
  </ul>
</template>

<script>
export default {
  name: "vx-timeline",
  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxTimeline.scss";
</style>
