<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <div class="md:w-7/8 w-full">
        <vs-input v-model="data.Name" class="w-full text-primary" />
      </div>

      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>

    <vs-divider class="mb-0"></vs-divider>
    <div class="vx-row mt-6 flex items-center px-6">
      <label class="text-lg opacity-75 text-primary">{{ $t("secure") }}</label>
      <vs-checkbox v-model="data.secure"></vs-checkbox>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar
      class="scroll-area--data-list-add-new"
      :settings="settings"
    >
      <div class="p-6 halfHeight scroll-area--data-list-add-new"></div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData">Submit</vs-button>
      <vs-button
        type="border"
        color="danger"
        @click="isSidebarActiveLocal = false"
        >Cancel</vs-button
      >
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { VTree, VSelectTree } from "vue-tree-halower";
import moduleTree from "@/store/tree/moduleTree.js";
/* eslint-disable */
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        let { Id, Name, NameFr, NameDe } = JSON.parse(
          JSON.stringify(this.data)
        );
        this.Id = Id;
        this.Name = Name;
        this.NameFr = NameFr;
        this.NameDe = NameDe;
        this.initValues();
      }
    }
  },

  data() {
    return {
      NewFolderData: {
        Id: 0,
        NewParentOrgID: 0,
        NewParentFoldID: 0,
        Name: ""
      },
      MoveNewFolders: [],
      level: 0,
      CurrentNode: {},
      index: 0,
      treeData: [
        {
          title: null,
          id: null,
          ParentId: null,
          expanded: false,
          children: []
        }
      ],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },

  computed: {
    MoveFolders() {
      return this.$store.state.treeList.MoveFolders;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid() {
      return !this.errors.any() && this.Name;
    }
  },

  methods: {
    actionFolder(item) {
      this.NewFolderData.NewParentFoldID = item.id;
      this.NewFolderData.Id = this.data.id;
      this.NewFolderData.Name = this.data.Name;
      // this.ActionOnFolder = !this.ActionOnFolder;
      // this.item = item;
    },
    tpl(...args) {
      const { 0: node, 2: parent, 3: index, 4: level } = args;
      let titleClass = node.selected
        ? "node-title node-selected"
        : "node-title";
      if (node.searched) titleClass += " node-searched"; //search

      return (
        <span>
          <span
            class="tree-expand"
            onClick={() => {
              this.popupActive2 = true;
              this.waitFor(_ => this.confirmClose === true).then(_ =>
                this.AsyncaddNode(node)
              );
            }}
          >
            <b class="text-xl">+</b>
          </span>
          <span
            class={titleClass}
            domPropsInnerHTML={node.title}
            onClick={() => {
              this.$refs.tree.nodeSelected(node);
              this.CurrentNode = node;
              this.NewFolderData.NewParentOrgID = node.id;
              // this.waitFor(_ => this.confirmClose === true).then(
              //   _ => (this.CurrentNode.selected = false)
              // );

              this.level = level.level;
              this.index = level.index;
              this.getFoldersList(0);
              this.$set(node, "expanded", false);
            }}
          ></span>
        </span>
      );
    },
    getFoldersList(ParentFoldID) {
      this.MoveNewFolders = [];
      let model = {};
      model.ParentOrgID = this.CurrentNode.id;
      model.ParentFoldID = ParentFoldID;

      this.$store
        .dispatch("treeList/GetFoldersList", model)
        .then(response => {
          if (response.data) {
            this.MoveNewFolders = response.data;
            this.$store.commit(
              "treeList/UpdateMoveFolders",
              this.MoveNewFolders
            );

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    GetBranch() {
      this.$vs.loading();
      if (this.treeData.length > 0) {
        this.NoDataInTree = true;
      }
      let model = {};
      model.ParentId = 0;

      this.$store
        .dispatch("treeList/GetBranchList", model)
        .then(response => {
          if (response.data) {
            if (model.ParentId == 0) {
              for (var i = 0; i < response.data.length; i++) {
                this.treeData[0].title = response.data[0].Name;
                this.treeData[0].id = response.data[0].id;
                this.treeData[0].ParentId = response.data[0].ParentOrgID;
              }
            }
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    nodeSelect(node, selected, position) {
      if (node.expanded) {
        node.children = [];
        this.$set(node, "expanded", true);
        this.GetBranchList(node, node.id);
      }
    },
    FakeexpandNode(node) {
      const expended = !node.expanded;
      this.$set(node, "expanded", true);
      this.$set(node, "hasExpended", true);
    },
    expandNode(node) {
      const expended = !node.expanded;
      this.$set(node, "expanded", true);
      this.$set(node, "hasExpended", true);
      this.GetBranchList(node, node.id);
      // if (node.children.length == 0) {
      //   if (node.async && !node.children) {
      // this.emitEventToTree("async-load-nodes", node);
      // }
      // }
    },
    GetBranchList(node, ParentId) {
      this.$vs.loading();
      let model = {};
      model.ParentId = ParentId;

      this.$store
        .dispatch("treeList/GetBranchList", model)
        .then(response => {
          if (response.data) {
            for (var i = 0; i < response.data.length; i++) {
              var CountryListItem = {};
              var hani = [];
              CountryListItem["title"] = response.data[i].Name;
              CountryListItem["id"] = response.data[i].id;
              CountryListItem["ParentId"] = response.data[i].ParentOrgID;
              CountryListItem["children"] = [];
              CountryListItem["expanded"] = false;
              CountryListItem["checked"] = false;
              hani.push(CountryListItem);
              this.$refs.tree.addNodes(node, hani);
              var childrenOBJ = {};
              var childrenList = [];
              childrenOBJ["title"] = "";
              childrenOBJ["id"] = null;
              childrenOBJ["expanded"] = false;
              childrenOBJ["checked"] = false;
              CountryListItem["children"].push(childrenOBJ);
              this.FakeexpandNode(childrenOBJ);
            }
            this.$vs.loading.close();
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    waitFor(conditionFunction) {
      const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
      };
      return new Promise(poll);
    },

    initValues() {
      if (this.data.Id) return;
      this.Id = null;
      this.Name = "";
      this.NameFr = "";
      this.NameDe = "";
    },

    submitData() {
      // this.$vs.dialog({
      //   type: "confirm",
      //   color: "#27ABBE",
      //   title: this.$t("ConfirmChange"),
      //   text: this.$t("YouAreAboutToAssignDriver"),
      //   accept: this.assignDriverToBiadjo,
      //   acceptText: this.$t("Save"),
      //   cancelText: this.$t("Cancel")
      // });
      // this.$emit("closeSidebar");
      // this.initValues();
      this.moveThisFolder();
    },
    moveThisFolder() {
      this.$store
        .dispatch("treeList/MoveFolder", this.NewFolderData)
        .then(response => {
          if (response.data) {
            this.$emit("closeSidebar");
            window.showSuccess();

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.dataImg = e.target.result;
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    }
  },

  components: {
    VuePerfectScrollbar,
    VTree,
    VSelectTree
  },
  created() {
    if (!moduleTree.isRegistered) {
      this.$store.registerModule("treeList", moduleTree);
      moduleTree.isRegistered = true;
    }
    this.GetBranch();
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }
  .header-sidebar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    h4 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      > button {
        margin-left: 10px;
      }
    }
  }

  .footer-sidebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    > button {
      border: 0px solid rgba(0, 0, 0, 0) !important;
      border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
      border-radius: 0px !important;
    }
  }
  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  height: calc(100% - 4.3rem);
}
</style>
