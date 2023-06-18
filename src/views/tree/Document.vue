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
  <div>
    <div>
      <!-- <vs-navbar v-model="data" class="p-2">
        <div slot="title">
          <vs-navbar-title>
            <span>{{ data }}</span>
          </vs-navbar-title>
        </div>

        <vs-navbar-item index="0">
          <a ><feather-icon icon="PlusIcon" svgClasses="w-5 h-5" /> </a>
        </vs-navbar-item>

        <vs-navbar-item index="1">
          <a >
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5" />
          </a>
        </vs-navbar-item>

        <vs-navbar-item index="2">
          <a > <feather-icon icon="XIcon" svgClasses="w-5 h-5" /> </a>
        </vs-navbar-item>

        <vs-input
          icon-pack="feather"
          icon="icon-search"
          placeholder="Search"
          v-model="search"
        />
      </vs-navbar> -->
    </div>
    <vs-divider color="primary"></vs-divider>
    <!-- data in api -->
    <div class="timeline-info">
      <!-- component -->
      <!-- <div class="flex w-full bg-grey-lighter">
        <label
          class="w-64 flex  px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input type="file" class="hidden" />
        </label>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Folders",
  activeItem: 0,
  search: "",
  // props: {
  //   data: {
  //     type: Array,
  //     required: true
  //   }
  // },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur"
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxTimeline.scss";
</style>
