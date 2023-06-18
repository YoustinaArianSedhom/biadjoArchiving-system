<template>
  <div>
    <!-- SideBar Start -->
    <div id="data-list-list-view" class="data-list-container">
      <move-sidebar
        :isSidebarActive="addNewDataSidebar"
        @closeSidebar="toggleDataSidebar"
        :data="folder"
      />
      <Properties-sidebar
        :isSidebarActive="PropertiesDataSidebar"
        @closeSidebar="togglePropertiesDataSidebar"
        :data="folder"
      />
    </div>
    <!-- SideBar End -->

    <!-- Tree Breadcrumb Start -->

    <div class="vx-row mb-5">
      <div
        class=" pt-2 h-10"
        v-for="(item, index) in TreeBreadcrumb"
        :key="index"
      >
        <span class="text-primary" @click="getNodeId(item.id, index)"
          >{{ item.title }} /</span
        >
      </div>

      <feather-icon
        class="mr-4 ml-4"
        icon="PlusIcon"
        @click="PopupAddFolderInParentNodeActive = true"
        svgClasses="w-4 h-4 border-solid border"
      />
    </div>

    <!--Tree  Breadcrumb End -->
    <!-- Task Bar Start -->
    <div
      class="bg-primary rounded-lg text-white pt-2 mr-5 ml-5 h-10"
      v-show="ActiveOnFolderSelected"
    >
      <!-- Folders Breadcrumb Start -->
      <div class=" vx-row float-left text-white mr-5 ml-5  ">
        <div>
          <feather-icon
            svgClasses="w-5 h-5 mr-2 ml-2"
            @click="BackToTreeFoldersList()"
            icon="ArrowLeftIcon"
          />
        </div>
        <div
          class="text-white"
          v-for="(item, index) in FoldersBreadcrumbList"
          :key="index"
        >
          <div
            @click="GoStepBackInFolders(item, index)"
            class="align-middle text-white"
          >
            {{ item.Name }}/
          </div>
        </div>
      </div>
      <!-- Folders Breadcrumb End -->

      <div class="float-right  mr-5 ml-5">
        <feather-icon
          icon="PlusIcon"
          @click="PopupAddFolderActive = true"
          svgClasses="w-5 h-5 mr-2 ml-2"
        />

        <feather-icon
          icon="EditIcon"
          @click="getFolderName"
          svgClasses="w-5 h-5 mr-2 ml-2"
        />

        <feather-icon
          icon="MoveIcon"
          @click="toggleDataSidebar(true)"
          svgClasses="w-5 h-5 mr-2 ml-2"
        />
      </div>
    </div>
    <!-- Task Bar End -->

    <!-- Folders List -->
    <div class="vx-row m-6" style="position: absolute;">
      <div v-for="(item, index) in ListOfFolders" :key="index">
        <div
          @click="OpenTaskbarForSelectedFolder(item)"
          @dblclick="OpenCurrentFolder(item)"
          @contextmenu.prevent="OpenContextMenu(item)"
          class="vx-col w-1/5 mb-2 mt-2"
        >
          <div
            class="w-64"
            :class="{ active: index === activeItem }"
            @click="SelectedFolder(index)"
          >
            <feather-icon
              icon="FolderIcon"
              svgClasses="w-12 h-12 fill-current"
              style="color:#f4d16d"
            />
            <span class="align-top ml-4 mr-4">{{ item.Name }}</span>
          </div>
        </div>
      </div>
      <!-- add folder -->
      <div class=" w-full mb-2 mt-2">
        <div class="vx-row">
          <div class="vx-col">
            <feather-icon
              @click="IsAddNewFolder = !IsAddNewFolder"
              icon="FolderPlusIcon"
              svgClasses="w-12 h-12 "
            />
          </div>

          <div v-if="IsAddNewFolder == false">
            <span class="align-middle ">{{ "New Folder" }}</span>
          </div>
          <div v-if="IsAddNewFolder == true">
            <vx-input-group class="align-middle">
              <vs-input
                class="w-32"
                :dir="$vs.rtl ? 'ltr' : 'ltr'"
                v-model="folderName"
              />

              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button
                    @click="AddfolderName"
                    color="success"
                    type="filled"
                    icon-pack="feather"
                    icon="icon-save"
                  ></vs-button>
                </div>
              </template>
            </vx-input-group>
          </div>
        </div>
      </div>
    </div>

    <vue-context ref="menu">
      <li @click="PopupAddFolderActive = true">
        <a class="flex items-center text-sm">
          <feather-icon icon="PlusIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Add") }}</span>
        </a>
      </li>

      <li @click="getFolderName">
        <a class="flex items-center text-sm">
          <feather-icon icon="EditIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Edit") }}</span>
        </a>
      </li>
      <li @click="toggleDataSidebar(true)">
        <a class="flex items-center text-sm">
          <feather-icon icon="MoveIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Move") }}</span>
        </a>
      </li>
      <li @click="togglePropertiesDataSidebar(true)">
        <a class="flex items-center text-sm">
          <feather-icon icon="FileIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Properties") }}</span>
        </a>
      </li>
    </vue-context>
    <!-- Popups Start -->
    <vs-popup
      classContent="popup-example"
      title="Enter Name"
      :active.sync="PopupAddFolderActive"
    >
      <vs-input
        class="inputx mb-3"
        v-validate="'required|min:3|max:100'"
        placeholder="Name"
        v-model="name"
      />
      <vs-button
        @click="AddFolderInFolder"
        :disabled="!validateForm"
        color="primary"
        type="filled"
        >{{ $t("Save") }}</vs-button
      >
    </vs-popup>
    <vs-popup
      classContent="popup-example"
      title="Enter Name"
      :active.sync="PopupAddFolderInParentNodeActive"
    >
      <vs-input
        class="inputx mb-3"
        v-validate="'required|min:3|max:100'"
        placeholder="Name"
        v-model="name"
      />
      <vs-button
        @click="AddFolderInParentNode"
        :disabled="!validateForm"
        color="primary"
        type="filled"
        >{{ $t("Save") }}</vs-button
      >
    </vs-popup>
    <vs-popup
      classContent="popup-example"
      title="Edit Name"
      :active.sync="EditFolderNamePopup"
    >
      <vs-input
        class="inputx mb-3"
        v-validate="'required|min:3|max:100'"
        placeholder="Name"
        v-model="name"
      />
      <vs-button
        @click="EditFolderName()"
        :disabled="!validateForm"
        color="primary"
        type="filled"
        >{{ $t("Save") }}</vs-button
      >
    </vs-popup>
    <!-- Popups End -->
  </div>
</template>

<script>
import moduleTree from "@/store/tree/moduleTree.js";
import MoveSidebar from "./MoveSidebar.vue";
import PropertiesSidebar from "./PropertiesSidebar.vue";
// import { VueContext } from "vue-context";
import VueContext from "vue-context";
import "@/assets/scss/folder.scss";

export default {
  components: {
    MoveSidebar,
    VueContext,
    PropertiesSidebar
  },
  name: "Folders",
  search: "",
  data() {
    return {
      IsAddNewFolder: false,
      ParentFolders: [],
      Node: {},
      open: "border-double",
      folder: {},
      editFolder: {},
      addNewDataSidebar: false,
      PropertiesDataSidebar: false,
      ListOfFolder: [],
      ActiveOnFolderSelected: false,
      name: "",
      folderName: "",
      PopupAddFolderActive: false,
      PopupAddFolderInParentNodeActive: false,
      EditFolderNamePopup: false,
      activeItem: null
    };
  },

  computed: {
    validateForm() {
      return this.name != "";
    },
    NodeId() {
      return this.$store.state.treeList.NodeId;
    },
    OpenNode() {
      return this.$store.state.treeList.OpenNode;
    },
    OpenComponent() {
      return this.$store.state.treeList.OpenComponent;
    },
    ListOfFolders() {
      return this.$store.state.treeList.ListOfFolders;
    },
    TreeBreadcrumb() {
      return this.$store.state.treeList.ListOfParents;
    },
    FoldersBreadcrumbList() {
      return this.ParentFolders;
    }
  },
  watch: {
    OpenNode: {
      deep: true,
      handler(newColor) {
        debugger;
        console.log("Oh, look, a new color!", newColor);

        this.getFoldersList(0);
      }
    },
    OpenComponent: {
      deep: true,
      handler(newColor) {
        debugger;
        console.log("Oh, look, a new color!", newColor);

        this.getFoldersList(0);
      }
    }
  },
  methods: {
    getFolderName() {
      debugger;
      this.name = this.folder.Name;
      this.EditFolderNamePopup = true;
    },

    SelectedFolder(index) {
      this.activeItem = index;
      this.$store.commit("treeList/UpdateSelectedFolderToMove", index);
    },

    BackToTreeFoldersList() {
      this.ParentFolders = [];
      this.getFoldersList(0);
    },

    OpenCurrentFolder(folder) {
      debugger;
      folder.Name = this.$options.filters.trimName(folder.Name);
      this.ParentFolders.push(folder);
      this.getFoldersList(folder.id);
      this.folder = folder;
    },

    GoStepBackInFolders(folder, index) {
      debugger;
      // this.ParentFolders.push(folder);
      for (var i = index + 1; i < this.ParentFolders.length; i++) {
        this.ParentFolders.pop();
      }
      this.getFoldersList(folder.id);
      this.folder = folder;
      console.log(this.folder);
    },

    OpenTaskbarForSelectedFolder(folder) {
      this.ActiveOnFolderSelected = true;
      this.folder = folder;
      // this.ParentFolders.push(folder);
      // this.$store.commit("treeList/UpdateParentFolders", this.ParentFolders);
    },

    OpenContextMenu(folder) {
      this.$refs.menu.open();
      this.folder = folder;
    },

    toggleDataSidebar(val = false) {
      debugger;
      let oldparent = this.folder.ParentFoldID;
      this.addNewDataSidebar = val;
      this.$store.commit("treeList/UpdateSelectedFolderToMove", this.folder);
      if (this.addNewDataSidebar == false) {
        debugger;
        this.getFoldersList(oldparent);
      }
    },

    togglePropertiesDataSidebar(val = false) {
      debugger;
      this.PropertiesDataSidebar = val;
      if (this.folder.ParentFoldID) {
        this.getFoldersList(this.folder.ParentFoldID);
      }
    },
    getNodeId(NodeID, index) {
      debugger;
      let newlist = [];

      // this.NodeId = NodeID;
      for (let item = 0; item < this.TreeBreadcrumb.length; item++) {
        if (item <= index) {
          newlist.push(this.TreeBreadcrumb[item]);
        }
      }
      this.$store.commit("treeList/UpdateListOfParents", newlist);
      this.$store.commit("treeList/UpdateNodeId", NodeID);

      this.getFoldersList(0);
    },
    getFoldersList(ParentFoldID) {
      debugger;
      this.$vs.loading();
      this.ListOfFolder = [];
      let model = {};
      this.folder = {};

      model.ParentOrgID = this.NodeId;
      model.ParentFoldID = ParentFoldID;
      this.$store
        .dispatch("treeList/GetFoldersList", model)
        .then(response => {
          if (response.data) {
            this.ActiveOnFolderSelected = true;

            this.ListOfFolder = response.data;
            this.$store.commit(
              "treeList/UpdateListOfFolders",
              this.ListOfFolder
            );
            this.$store.commit("treeList/UpdateOpenNode", false);

            // this.$store.state.treeList.ListOfFolders =this.PindData.ListOfFolders;

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

    AddfolderName() {
      this.name = this.folderName;
      if (this.folder.id) {
        this.CreateFolder(this.folder.id);
      } else {
        this.CreateFolder(0);
      }
    },
    AddFolderInFolder() {
      debugger;

      this.Node = this.NodeId;

      this.PopupAddFolderActive = false;
      if (this.folder.id) {
        this.CreateFolder(this.folder.id);
      } else {
        this.CreateFolder(0);
      }
    },

    AddFolderInParentNode() {
      debugger;

      this.Node = this.NodeId;
      this.PopupAddFolderInParentNodeActive = false;
      this.CreateFolder(0);
    },

    CreateFolder(ParentFoldID) {
      this.$vs.loading();
      let model = {};
      debugger;
      model.ParentOrgID = this.NodeId;
      model.ParentFoldID = ParentFoldID;
      model.Name = this.name;

      this.$store
        .dispatch("treeList/CreateFolder", model)
        .then(response => {
          if (response.data == "Success") {
            this.name = null;
            // this.PindData.ListOfFolders = response.data;
            this.$vs.loading.close();
            window.showSuccess();
            this.ListOfFolder.push(model);
            this.$store.commit(
              "treeList/UpdateListOfFolders",
              this.ListOfFolder
            );
            this.name = "";
            this.folderName = "";
            this.IsAddNewFolder = false;
          } else {
            this.$vs.loading.close();
            window.showError();
            this.name = "";
            this.folderName = "";
            this.IsAddNewFolder = false;
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          this.name = "";
          this.folderName = "";
          this.IsAddNewFolder = false;
        });
    },

    EditFolderName() {
      debugger;
      this.$vs.loading();
      this.editFolder.ParentFoldID = this.folder.id;
      this.EditFolderNamePopup = false;

      let model = {};
      model.Id = this.folder.id;
      model.Name = this.name;

      this.$store
        .dispatch("treeList/EditFolderName", model)
        .then(response => {
          if (response.data == "Success") {
            this.folder.Name = this.name;
            debugger;
            this.$vs.loading.close();
            window.showSuccess();
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            // binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
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
@import "@/assets/scss/vuexy/components/vxTimeline.scss";
</style>
