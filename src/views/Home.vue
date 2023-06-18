<template>
  <div class="flex w-full bg-img vx-row no-gutter justify-center">
    <div
      class="vx-col w-screen sm:w-full md:w-full mb-base lg:w-1/3 "
      id="account-info-col-1"
    >
      <vx-card id="card" class="mb-base scroll-area scroll">
        <tree></tree>
      </vx-card>
    </div>

    <div
      class="vx-col sm:w-full md:w-full mb-base lg:w-2/3 "
      id="account-info-col-1"
    >
      <vx-card
        id="card"
        v-show="OpenComponent"
        class="mb-base half-scroll-area scroll"
      >
        <div class="vx-col  w-full ">
          <Folders v-if="NodeId != {}"></Folders>
          <span v-else class="text-warning text-lg">{{ $t("NoFolders") }}</span>
        </div>
      </vx-card>
      <!-- <vx-card
          id="card"
          v-show="OpenComponent"
          class="mb-base half-scroll-area scroll"
        >
          <div class="vx-col scroll-area scroll  w-full ">
            <Document v-if="NodeId != {}"></Document>
            <span v-else class="text-warning text-lg">{{
              $t("NoDocument")
            }}</span>
          </div>
        </vx-card> -->
    </div>
  </div>
</template>

<script>
import tree from "@/views/tree/Tree.vue";
import Folders from "@/views/tree/Folders.vue";
// import Document from "@/views/tree/Document.vue";
import moduleTree from "@/store/tree/moduleTree.js";

export default {
  data() {
    return {
      // active: false
    };
  },
  components: {
    tree,
    Folders
    // Document
  },
  computed: {
    OpenNode() {
      return this.$store.state.treeList.OpenNode;
    },
    OpenComponent() {
      return this.$store.state.treeList.OpenComponent;
    },
    NodeId() {
      return this.$store.state.treeList.NodeId;
    },
    ListOfFolders() {
      return this.$store.state.treeList.ListOfFolders;
    },
    ListOfParents() {
      return this.$store.state.treeList.ListOfParents;
    }
  },
  created() {
    if (!moduleTree.isRegistered) {
      this.$store.registerModule("treeList", moduleTree);
      moduleTree.isRegistered = true;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/vuexy/extraComponents/tree.scss";

button.btn-async {
  background: rgba(var(--vs-warning), 0.15);
}
.scroll::-webkit-scrollbar-thumb {
  background: #27abbe;
  border-radius: 5px;
}

.scroll-area {
  overflow: auto;
  height: 600px;
}
.half-scroll-area {
  overflow: auto;
  height: 300px !important;
}
.scroll::-webkit-scrollbar {
  width: 15px;
}

/* Track */
.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

button.btn-delete {
  background: rgba(var(--vs-danger), 0.15);
}
#account-info-col-1 {
  padding-right: 10px;
}
#card_tree {
  height: 800px;
  padding-right: 10px;
}
#card {
  height: 385px;
}
</style>
