<template>
  <div>
    <div v-show="NoDataInTree == true">
      <vs-button
        color="primary"
        type="filled"
        @click="CreateOrgTreeBranch(0)"
        class="mb-3"
        >{{ $t("CreateOrganizationChart") }}</vs-button
      >
    </div>

    <v-tree
      ref="tree"
      style="overflow: hidden;"
      class="flex "
      :canDeleteRoot="false"
      :data="treeData"
      :draggable="false"
      :tpl="tpl"
      :halfcheck="true"
      :multiple="false"
      :selectAlone="true"
      :radio="true"
      :allowGetParentNode="true"
      @node-expand="nodeSelect"
      @onContextmenu="nodeSelect"
      @contextmenu.prevent="$refs.menu.open"
      id="TreenoContextMenu"
      v-click-outside="outside"
    >
    </v-tree>

    <vue-context ref="menu" :style="`top:${MPosition.y}px`">
      <li @click="optionClickedAdd()">
        <a class="flex items-center text-sm">
          <feather-icon icon="PlusIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Add") }}</span>
        </a>
      </li>
      <li @click="optionClickedOpen()">
        <a class="flex items-center text-sm">
          <feather-icon icon="FileIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Open") }}</span>
        </a>
      </li>
      <li @click="optionClickedDelete()">
        <a class="flex items-center text-sm">
          <feather-icon icon="SaveIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Delete") }}</span>
        </a>
      </li>
      <li @click="optionClickedEdit()">
        <a class="flex items-center text-sm">
          <feather-icon icon="EditIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Edit") }}</span>
        </a>
      </li>
      <li @click="optionClickedSave()">
        <a class="flex items-center text-sm">
          <feather-icon icon="XIcon" svgClasses="w-5 h-5" />
          <span class="ml-2">{{ $t("Close") }}</span>
        </a>
      </li>
    </vue-context>
    <!-- popup edit current node -->
    <vs-popup
      classContent="popup-example"
      title="Edit Node"
      :active.sync="popupActiveEditNode"
    >
      <vs-input class="inputx mb-3" placeholder="Disabled" v-model="name" />
      <vs-button
        @click="closeit"
        color="primary"
        type="filled"
        v-click-outside="outside"
        >{{ $t("Save") }}</vs-button
      >
    </vs-popup>
    <!-- popup add new node -->
    <vs-popup
      classContent="popup-example"
      title="Add Node"
      :active.sync="popupActiveAddNode"
    >
      <vs-input class="inputx mb-3" placeholder="Disabled" v-model="name" />
      <vs-button
        @click="closeit"
        color="primary"
        type="filled"
        v-click-outside="outside"
        >{{ $t("Save") }}</vs-button
      >
    </vs-popup>
  </div>
</template>

<script>
import moduleTree from "@/store/tree/moduleTree.js";
// import { VueContext } from "vue-context";
import VueContext from "vue-context";
import "vue-context/src/sass/vue-context.scss";
import { VTree, VSelectTree } from "vue-tree-halower";
// import Folders from "@/views/tree/Folders.vue";
// import Document from "@/views/tree/Document.vue";
import "@/assets/css/tree.css";

/* eslint-disable */
export default {
  components: {
    // Folders,
    VTree,
    VSelectTree,
    VueContext
    // Document
  },
  data() {
    return {
      clickList: [],
      level: null,
      PindData: { ListOfParents: [], CurrentNode: {}, ListOfFolders: [] },
      index: 0,
      NoDataInTree: false,
      editing: false,
      // index: null,
      deletenode: {
        node: "",
        parent: "",
        index: ""
      },
      searchword: "",
      popupActiveEditNode: false,
      popupActiveAddNode: false,
      confirmClose: false,
      name: "",
      treeData: [
        {
          title: null,
          id: null,
          ParentId: null,
          expanded: false,
          children: []
        }
      ]
    };
  },
  computed: {
    MPosition() {
      return this.$store.state.MPosition;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  methods: {
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
            v-click-outside="outside"
            onClick={() => {
              this.popupActiveAddNode = true;
              this.waitFor(_ => this.confirmClose === true).then(_ => {
                this.AsyncaddNode(node);
              });
            }}
          >
            <b class="text-xl">+</b>
          </span>
          <span
            class={titleClass}
            domPropsInnerHTML={node.title}
            v-click-outside="outside"
            onContextmenu={() => {
              // this.$store.state.treeList.NodeId = this.PindData.CurrentNode.id;
              var noContext = document.getElementById("TreenoContextMenu");

              noContext.addEventListener("contextmenu", e => {
                this.$refs.menu.open(true);
                var Obj = {
                  x: e.pageX,
                  y: e.pageY
                };
                this.$store.commit("UPDATE_Mouse_Position", Obj);
                e.preventDefault();
              });
              this.$refs.tree.nodeSelected(node);
              this.PindData.CurrentNode = node;
              this.$store.commit(
                "treeList/UpdateNodeId",
                this.PindData.CurrentNode.id
              );
            }}
            onClick={() => {
              this.$refs.tree.nodeSelected(node);
              this.PindData.CurrentNode = node;
              this.optionClickedOpen(level.level, level.index);

              // this.$store.commit("treeList/UpdateListOfFolders", []);
              this.list(this.PindData.CurrentNode, level.level, level.index);
            }}
          ></span>
        </span>
      );
    },

    optionClickedSave() {
      console.log(this.PindData.CurrentNode);
      // this.$store.commit("treeList/UpdateListOfFolders", []);
    },
    optionClickedAdd() {
      this.popupActiveAddNode = true;
      this.waitFor(_ => this.confirmClose === true).then(_ =>
        this.AsyncaddNode(this.PindData.CurrentNode)
      );

      // this.$store.state.treeList.NodeId = this.PindData.CurrentNode.id;
      this.$store.commit("treeList/UpdateNodeId", this.PindData.CurrentNode.id);
      console.log(this.PindData.CurrentNode);
      this.PindData.CurrentNode.selected = false;
    },
    optionClickedDelete() {
      console.log(this.PindData.CurrentNode);
    },
    optionClickedOpen(level, index) {
      debugger;
      // this.$store.commit("treeList/UpdateOpenNode", false);
      this.$store.commit("treeList/UpdateListOfFolders", []);
      this.list(this.PindData.CurrentNode, level, index);
      console.log(this.PindData.CurrentNode.id);

      this.$store.commit("treeList/UpdateNodeId", this.PindData.CurrentNode.id);
      this.$store.commit("treeList/UpdateOpenNode", true);

      this.$store.commit("treeList/UpdateOpenComponent", true);
    },
    optionClickedEdit() {
      this.name = this.PindData.CurrentNode.title;
      this.popupActiveEditNode = true;
      this.waitFor(_ => this.confirmClose === true).then(_ =>
        this.AsyncEditNode(this.PindData.CurrentNode)
      );

      this.PindData.CurrentNode.selected = false;
      console.log(this.PindData.CurrentNode);
    },
    clickMe(ref) {
      console.log(ref);
    },
    outside: function() {
      if (this.PindData.CurrentNode != null) {
        if (this.PindData.CurrentNode.selected == true) {
          this.PindData.CurrentNode.selected = false;
        }
      }
    },
    async confirmation(node, parent, index) {
      this.deletenode.node = node;
      this.deletenode.parent = parent;
      this.deletenode.index = index;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToDeleteThisNode"),
        accept: this.deleteNode,
        acceptText: this.$t("Delete"),
        cancelText: this.$t("Cancel"),

        cancel: this.CancelAlert
      });
    },
    async deleteNode() {
      this.$refs.tree.delNode(
        this.deletenode.node,
        this.deletenode.parent,
        this.deletenode.index
      );
    },

    list(node, level) {
      let title = node.title;
      let id = node.id;
      if (this.PindData.ListOfParents.length == 0) {
        this.PindData.ListOfParents.push({ title, id, level });
      } else if (
        this.PindData.ListOfParents.length == 1 &&
        this.PindData.ListOfParents[0].id == node.id
      ) {
        this.PindData.ListOfParents[0].title = title;
      } else {
        for (var i in this.PindData.ListOfParents) {
          if (this.PindData.ListOfParents[i].level >= level) {
            this.PindData.ListOfParents.pop({ title, id, i });
          }
        }
        if (this.PindData.ListOfParents.length == level) {
          this.PindData.ListOfParents[level - 1].title = title;
          // this.PindData.ListOfParents[level - 1].idx = idx;
          this.PindData.ListOfParents[level - 1].id = id;
        } else {
          //fe 7alet push

          let ll = this.PindData.ListOfParents.length - 1;
          if (this.PindData.ListOfParents[ll].id == node.ParentId) {
            this.PindData.ListOfParents.push({ title, id, level });
          } else {
            let l = this.PindData.ListOfParents.length - 1;
            let zz = this.PindData.ListOfParents[l].title;
            let xx = this.PindData.ListOfParents[l].id;
            let oo = this.PindData.ListOfParents[l].level;
            // let mm = this.PindData.ListOfParents[l].idx;
            this.PindData.ListOfParents.pop({ zz, xx, oo });
            for (var i = 0; i < this.clickList.length; i++) {
              if (this.clickList[i].id == node.ParentId) {
                let ttttt = this.clickList[i].title;
                let iiiii = this.clickList[i].id;

                let lllll = this.PindData.ListOfParents.length + 1;
                this.PindData.ListOfParents.push({
                  title: ttttt,
                  id: iiiii,
                  level: lllll
                });

                this.PindData.ListOfParents.push({ title, id, level });
              }
            }
          }
        }
      }
      this.$store.commit(
        "treeList/UpdateListOfParents",
        this.PindData.ListOfParents
      );
    },
    nodeSelect(node, selected, position) {
      if (node.expanded) {
        node.children = [];
        this.$store.commit("treeList/UpdateListOfFolders", []);

        // if (node.children.length > 0) {
        debugger;
        //expand node
        this.$set(node, "expanded", true);
        this.GetBranchList(node, node.id);
        this.clickList.push(node);
        this.list(node, position.level, position.index);

        this.$store.commit("treeList/UpdateOpenComponent", true);
        this.$store.commit("treeList/UpdateNodeId", node.id);

        this.$store.commit("treeList/UpdateOpenNode", true);

        // }
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

    async AsyncEditNode(node) {
      // this.name = node.title;
      this.$vs.loading();

      if (this.confirmClose === true) {
        const { checked = false } = node;
        this.$set(node, "loading", true);
        let model = {};
        model.Id = node.id;
        model.Name = this.name;
        this.$store
          .dispatch("treeList/EditOrgTreeBranchName", model)
          .then(response => {
            if (response.data) {
              // this.editing == true;
              // this.treeData = response.data;
              // if (this.editing == true) {
              node.title = this.name;
              // }
              this.confirmClose = false;

              if (checked) {
                this.$refs.tree.childCheckedHandle(node, checked);
              }
              this.$vs.loading.close();
              this.name = "";
            } else {
              window.showError();
              this.name = "";
              this.$vs.loading.close();
            }
          })
          .catch(() => {
            this.$vs.loading.close();
            window.showError();
            this.name = "";
          });
        // await this.EditOrgTreeBranchName(node.id, this.name, index).then(
        //   response => {
        //     if (this.editing == true) {
        //       node.title = this.name;
        //     }
        //     this.confirmClose = false;
        //   }
        // );
      }
    },

    async AsyncaddNode(node) {
      debugger;
      if (this.confirmClose === true) {
        this.$vs.loading();
        node.children = [];
        let model = {};

        model.ParentId = node.id;

        model.Name = this.name;

        this.$store
          .dispatch("treeList/CreateOrgTreeBranch", model)
          .then(response => {
            if (response.data == "Success") {
              const { checked = false } = node;
              this.$set(node, "loading", true);
              this.GetBranchList(node, node.id);
              this.$set(node, "loading", false);
              this.confirmClose = false;
              if (checked) {
                this.$refs.tree.childCheckedHandle(node, checked);
              }
              this.$vs.loading.close();
              window.showSuccess();
              this.name = "";
            } else {
              this.$vs.loading.close();
              window.showError();
              this.name = "";
            }
          })
          .catch(() => {
            this.$vs.loading.close();
            window.showError();
            this.name = "";
          });
      }
    },
    closeit() {
      debugger;
      this.popupActiveEditNode = false;
      this.popupActiveAddNode = false;
      this.confirmClose = true;
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
    CreateOrgTreeBranch(ParentId) {
      let model = {};
      this.name = "";
      model.ParentId = ParentId;
      this.popupActiveAddNode = true;
      this.waitFor(_ => this.confirmClose === true).then(_ => {
        this.$vs.loading();
        model.Name = this.name;
        this.$store
          .dispatch("treeList/CreateOrgTreeBranch", model)
          .then(response => {
            if (response.data == "Success") {
              this.$vs.loading.close();
              window.showSuccess();
              this.GetBranch();
            } else {
              this.$vs.loading.close();
              window.showError();
            }
          })
          .catch(() => {
            this.$vs.loading.close();
            window.showError();
          });
      });
    },

    GetBranch() {
      this.$vs.loading();
      debugger;

      debugger;
      let model = {};
      model.ParentId = 0;

      this.$store
        .dispatch("treeList/GetBranchList", model)
        .then(response => {
          debugger;
          if (response.data.length == 0) {
            this.NoDataInTree = true;
          }
          // if (response.data) {
          // if (model.ParentId == 0) {
          // for (var i = 0; i < response.data.length; i++) {
          this.treeData[0].title = response.data[0].Name;
          this.treeData[0].id = response.data[0].id;
          this.treeData[0].ParentId = response.data[0].ParentOrgID;
          // }
          // }

          // }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          // window.showError();
        });
    },

    search() {
      this.$refs.tree.searchNodes(this.searchword);
    },

    waitFor(conditionFunction) {
      const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
      };
      return new Promise(poll);
    }
  },

  // async asyncLoad(node) {
  //   const { checked = false } = node;
  //   this.$set(node, "loading", true);
  //   const pro = new Promise(resolve => {
  //     setTimeout(resolve, 2000, ["async node1", "async node2"]);
  //   });
  //   this.$refs.tree.addNodes(node, await pro);
  //   this.$set(node, "loading", false);
  //   this.confirmClose = false;
  //   if (checked) {
  //     this.$refs.tree.childCheckedHandle(node, checked);
  //   }
  // },

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
    this.GetBranch();
  }
};
</script>

<style>
/* @import "~vue-context/dist/css/vue-context.css"; */

/* @import "@/assets/scss/vuexy/extraComponents/_contextMenu.scss"; */
</style>
